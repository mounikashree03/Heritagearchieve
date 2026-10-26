const runAuthTests = async () => {
  console.log('🔐 Running HeritageArchive Authentication Test Suite...\n');

  let passed = 0;
  let failed = 0;

  // 1. Test Login with Default Curator
  let curatorToken = '';
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'curator@heritagearchive.org',
        password: 'adminPassword123!'
      })
    });
    const json = await res.json();
    if (res.status === 200 && json.token && json.user.role === 'admin') {
      curatorToken = json.token;
      passed++;
      console.log('✅ [PASS] POST /api/auth/login (Curator Admin) -> HTTP 200, Token issued');
    } else {
      failed++;
      console.error('❌ [FAIL] POST /api/auth/login -> Expected 200, got', res.status, json);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] POST /api/auth/login Exception:', e.message);
  }

  // 2. Test Invalid Password
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'curator@heritagearchive.org',
        password: 'wrongpassword'
      })
    });
    const json = await res.json();
    if (res.status === 401 && json.success === false) {
      passed++;
      console.log('✅ [PASS] POST /api/auth/login (Invalid Password) -> HTTP 401 rejected safely');
    } else {
      failed++;
      console.error('❌ [FAIL] POST /api/auth/login -> Expected 401, got', res.status, json);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] POST /api/auth/login Exception:', e.message);
  }

  // 3. Test User Registration
  let testUserToken = '';
  const testEmail = `researcher_${Date.now()}@example.com`;
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Archival Scholar',
        email: testEmail,
        password: 'secretPassword123!',
        bio: 'Visiting researcher in Dravidian archaeology.'
      })
    });
    const json = await res.json();
    if (res.status === 201 && json.token && json.user.role === 'researcher') {
      testUserToken = json.token;
      passed++;
      console.log(`✅ [PASS] POST /api/auth/register (${testEmail}) -> HTTP 201 created`);
    } else {
      failed++;
      console.error('❌ [FAIL] POST /api/auth/register -> Expected 201, got', res.status, json);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] POST /api/auth/register Exception:', e.message);
  }

  // 4. Test Duplicate Email Registration
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate Scholar',
        email: testEmail,
        password: 'secretPassword123!'
      })
    });
    if (res.status === 409) {
      passed++;
      console.log('✅ [PASS] POST /api/auth/register (Duplicate Email) -> HTTP 409 conflict handled');
    } else {
      failed++;
      console.error('❌ [FAIL] POST /api/auth/register Duplicate -> Expected 409, got', res.status);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] POST /api/auth/register Duplicate Exception:', e.message);
  }

  // 5. Test GET /api/auth/me with Bearer Token
  try {
    const res = await fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${testUserToken}` }
    });
    const json = await res.json();
    if (res.status === 200 && json.user.email === testEmail) {
      passed++;
      console.log('✅ [PASS] GET /api/auth/me (Valid Token) -> HTTP 200 user returned');
    } else {
      failed++;
      console.error('❌ [FAIL] GET /api/auth/me -> Expected 200, got', res.status, json);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] GET /api/auth/me Exception:', e.message);
  }

  // 6. Test GET /api/auth/me without Token
  try {
    const res = await fetch('http://localhost:5000/api/auth/me');
    if (res.status === 401) {
      passed++;
      console.log('✅ [PASS] GET /api/auth/me (No Token) -> HTTP 401 unauthorized');
    } else {
      failed++;
      console.error('❌ [FAIL] GET /api/auth/me No Token -> Expected 401, got', res.status);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] GET /api/auth/me No Token Exception:', e.message);
  }

  // 7. Test Admin-Only Route with Admin Token
  try {
    const res = await fetch('http://localhost:5000/api/auth/admin/stats', {
      headers: { Authorization: `Bearer ${curatorToken}` }
    });
    const json = await res.json();
    if (res.status === 200 && json.stats.totalArtifacts >= 68) {
      passed++;
      console.log(`✅ [PASS] GET /api/auth/admin/stats (Admin Token) -> HTTP 200 stats: ${json.stats.totalArtifacts} artifacts, ${json.stats.totalUsers} users`);
    } else {
      failed++;
      console.error('❌ [FAIL] GET /api/auth/admin/stats -> Expected 200, got', res.status, json);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] GET /api/auth/admin/stats Exception:', e.message);
  }

  // 8. Test Admin-Only Route with Non-Admin Token
  try {
    const res = await fetch('http://localhost:5000/api/auth/admin/stats', {
      headers: { Authorization: `Bearer ${testUserToken}` }
    });
    if (res.status === 403) {
      passed++;
      console.log('✅ [PASS] GET /api/auth/admin/stats (Researcher Token) -> HTTP 403 Forbidden properly blocked');
    } else {
      failed++;
      console.error('❌ [FAIL] GET /api/auth/admin/stats Non-admin -> Expected 403, got', res.status);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] GET /api/auth/admin/stats Non-admin Exception:', e.message);
  }

  // 9. Test Bookmarking an Artifact
  try {
    const addRes = await fetch('http://localhost:5000/api/auth/favorites/1', {
      method: 'POST',
      headers: { Authorization: `Bearer ${testUserToken}` }
    });
    const addJson = await addRes.json();
    const listRes = await fetch('http://localhost:5000/api/auth/favorites', {
      headers: { Authorization: `Bearer ${testUserToken}` }
    });
    const listJson = await listRes.json();

    if (addRes.status === 200 && listRes.status === 200 && listJson.count >= 1) {
      passed++;
      console.log(`✅ [PASS] Bookmarks (POST & GET /api/auth/favorites) -> HTTP 200 bookmarked artifact 1: "${listJson.data[0].name}"`);
    } else {
      failed++;
      console.error('❌ [FAIL] Bookmarks -> Unexpected response', addJson, listJson);
    }
  } catch (e) {
    failed++;
    console.error('❌ [FAIL] Bookmarks Exception:', e.message);
  }

  console.log('\n====================================================');
  console.log(`🏁 Auth Test Results: ${passed} PASSED, ${failed} FAILED out of 9 tests.`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
};

runAuthTests();
