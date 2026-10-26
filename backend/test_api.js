const testEndpoints = async () => {
  const tests = [
    { name: 'GET /api/health', url: 'http://localhost:5000/api/health' },
    { name: 'GET /api/states', url: 'http://localhost:5000/api/states' },
    { name: 'GET /api/states/1', url: 'http://localhost:5000/api/states/1' },
    { name: 'GET /api/states/tamil-nadu', url: 'http://localhost:5000/api/states/tamil-nadu' },
    { name: 'GET /api/states/999 (Invalid ID)', url: 'http://localhost:5000/api/states/999', expectStatus: 404 },
    { name: 'GET /api/districts', url: 'http://localhost:5000/api/districts' },
    { name: 'GET /api/districts/state/1', url: 'http://localhost:5000/api/districts/state/1' },
    { name: 'GET /api/districts/state/tamil-nadu', url: 'http://localhost:5000/api/districts/state/tamil-nadu' },
    { name: 'GET /api/districts/1', url: 'http://localhost:5000/api/districts/1' },
    { name: 'GET /api/districts/999 (Invalid ID)', url: 'http://localhost:5000/api/districts/999', expectStatus: 404 },
    { name: 'GET /api/categories', url: 'http://localhost:5000/api/categories' },
    { name: 'GET /api/categories/1', url: 'http://localhost:5000/api/categories/1' },
    { name: 'GET /api/categories/999 (Invalid ID)', url: 'http://localhost:5000/api/categories/999', expectStatus: 404 },
    { name: 'GET /api/artifacts (Paginated)', url: 'http://localhost:5000/api/artifacts' },
    { name: 'GET /api/artifacts?page=2&limit=5', url: 'http://localhost:5000/api/artifacts?page=2&limit=5' },
    { name: 'GET /api/artifacts/1', url: 'http://localhost:5000/api/artifacts/1' },
    { name: 'GET /api/artifacts/999 (Invalid ID)', url: 'http://localhost:5000/api/artifacts/999', expectStatus: 404 },
    { name: 'GET /api/artifacts/district/1', url: 'http://localhost:5000/api/artifacts/district/1' },
    { name: 'GET /api/artifacts/category/1', url: 'http://localhost:5000/api/artifacts/category/1' },
    { name: 'GET /api/artifacts/search?q=coin', url: 'http://localhost:5000/api/artifacts/search?q=coin' },
    { name: 'GET /api/artifacts/search?q=chola', url: 'http://localhost:5000/api/artifacts/search?q=chola' },
    { name: 'GET /api/artifacts/search?q= (Empty query)', url: 'http://localhost:5000/api/artifacts/search?q=', expectStatus: 400 },
    { name: 'GET /api/artifacts/filter?stateId=1', url: 'http://localhost:5000/api/artifacts/filter?stateId=1' },
    { name: 'GET /api/artifacts/filter?material=bronze', url: 'http://localhost:5000/api/artifacts/filter?material=bronze' },
    { name: 'GET /api/artifacts/filter?period=Chola&sortBy=name-asc', url: 'http://localhost:5000/api/artifacts/filter?period=Chola&sortBy=name-asc' },
    { name: 'GET /api/artifacts/featured', url: 'http://localhost:5000/api/artifacts/featured' },
    { name: 'GET /api/artifacts/statistics', url: 'http://localhost:5000/api/artifacts/statistics' },
    { name: 'GET /api/artifacts/1/related', url: 'http://localhost:5000/api/artifacts/1/related' }
  ];

  let passed = 0;
  let failed = 0;

  console.log('🏛️  HeritageArchive API Test Suite: Running 28 tests...\n');

  for (const t of tests) {
    try {
      const res = await fetch(t.url);
      const json = await res.json();
      const expectedStatus = t.expectStatus || 200;
      const statusOk = res.status === expectedStatus;
      if (statusOk) {
        passed++;
        let info = '';
        if (json.count !== undefined) info += ` | count: ${json.count}`;
        if (json.totalCount !== undefined) info += ` | total: ${json.totalCount} (page ${json.page}/${json.totalPages})`;
        if (json.database?.connected !== undefined) info += ` | db: ${json.database.connected ? 'CONNECTED' : 'FAILED'}`;
        if (json.data && !Array.isArray(json.data) && (json.data.name || json.data.state_name || json.data.district_name || json.data.artifact_name)) {
          info += ` | name: "${json.data.name || json.data.artifact_name}"`;
        }
        if (json.message) info += ` | msg: "${json.message}"`;
        console.log(`✅ [PASS] ${t.name} -> HTTP ${res.status}${info}`);
      } else {
        failed++;
        console.error(`❌ [FAIL] ${t.name} -> Expected HTTP ${expectedStatus}, got ${res.status}`);
        console.error('          Response:', json);
      }
    } catch (e) {
      failed++;
      console.error(`❌ [FAIL] ${t.name} -> Exception: ${e.message}`);
    }
  }

  console.log('\n====================================================');
  console.log(`🏁 Test Results: ${passed} PASSED, ${failed} FAILED out of ${tests.length} tests.`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
};

testEndpoints();
