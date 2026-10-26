/**
 * HeritageArchive - Centralized Data Service Layer
 * 
 * Interacts with the Express REST API backend and MySQL database.
 * Backend base URL defaults to: http://localhost:5000/api
 */

import { states as staticStates } from '../data/states.js';
import { districts as staticDistricts } from '../data/districts.js';
import { categories as staticCategories } from '../data/categories.js';
import { artifacts as staticArtifacts } from '../data/artifacts.js';
import { historicalPeriods as staticPeriods } from '../data/periods.js';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to fetch with timeout and standard JSON parsing
 */
const fetchApi = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  const isPublicAuth = endpoint.startsWith('/auth/login') || endpoint.startsWith('/auth/register');
  const token = typeof window !== 'undefined' ? localStorage.getItem('heritage_auth_token') : null;
  const authHeaders = (!isPublicAuth && token) ? { 'Authorization': `Bearer ${token}` } : {};

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...authHeaders,
        ...(options.headers || {})
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorMsg = `API error ${res.status}: ${res.statusText}`;
      try {
        const errJson = await res.json();
        if (errJson && errJson.message) {
          errorMsg = errJson.message;
        } else if (errJson && errJson.error) {
          errorMsg = typeof errJson.error === 'string' ? errJson.error : JSON.stringify(errJson.error);
        }
      } catch {
        // Fallback to status text
      }
      const err = new Error(errorMsg);
      err.status = res.status;
      throw err;
    }

    const json = await res.json();
    return json;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
};

/**
 * Transforms an artifact object to harmonize database and frontend conventions
 */
export const transformArtifact = (item) => {
  if (!item) return null;
  return {
    id: item.artifact_id ? String(item.artifact_id) : (item.id || ''),
    rawId: item.artifact_id || item.id,
    name: item.artifact_name || item.name || '',
    stateId: item.state_id ? String(item.state_id) : (item.stateId || ''),
    state: item.state_name || item.state || '',
    districtId: item.district_id ? String(item.district_id) : (item.districtId || ''),
    district: item.district_name || item.district || '',
    categoryId: item.category_id ? String(item.category_id) : (item.categoryId || ''),
    category: item.category_name || item.category || '',
    historicalPeriod: item.historical_period || item.historicalPeriod || 'Classical Era',
    dynasty: item.dynasty_or_civilization || item.dynasty || 'Historical India',
    approximateAge: item.approximate_age || item.approximateAge || 'Circa antiquity',
    material: item.material || 'Material heritage',
    placeOfOrigin: item.place_of_origin || item.placeOfOrigin || '',
    shortDescription: item.shortDescription || (item.description ? item.description.slice(0, 160) + '...' : ''),
    historicalDescription: item.description || item.historicalDescription || '',
    historicalSignificance: item.historical_significance || item.historicalSignificance || '',
    culturalImportance: item.cultural_importance || item.culturalImportance || '',
    created_at: item.created_at,
    updated_at: item.updated_at
  };
};

export const artifactService = {
  // Check backend server and MySQL connection health
  checkHealth: async () => {
    try {
      const data = await fetchApi('/health');
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  },

  // Global statistical counters
  getStatistics: async () => {
    try {
      const res = await fetchApi('/artifacts/statistics');
      if (res && res.data) return res.data;
    } catch (err) {
      console.warn('[HeritageArchive API] Falling back to local dataset stats:', err.message);
      return {
        artifactsCount: staticArtifacts.length,
        statesCount: staticStates.length,
        districtsCount: staticDistricts.length,
        categoriesCount: staticCategories.length,
        isFallback: true,
        error: err.message
      };
    }
  },

  // Get all states with computed counts
  getStates: async () => {
    try {
      const res = await fetchApi('/states');
      // Read states from response.data according to backend structure: { success: true, count: 15, data: [...] }
      const statesArray = Array.isArray(res?.data)
        ? res.data
        : (Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : []));

      return statesArray.map(s => ({
        id: String(s.state_id || s.id),
        state_id: Number(s.state_id || s.id),
        name: s.state_name || s.name || '',
        state_name: s.state_name || s.name || '',
        description: s.description || '',
        artifactCount: Number(s.artifact_count ?? s.artifactCount ?? 0),
        artifact_count: Number(s.artifact_count ?? s.artifactCount ?? 0),
        districtCount: Number(s.district_count ?? s.districtCount ?? 0),
        district_count: Number(s.district_count ?? s.districtCount ?? 0)
      }));
    } catch (err) {
      console.warn('[HeritageArchive API] Failed to fetch states from backend:', err.message);
      return staticStates.map(s => ({
        id: String(s.id),
        state_id: s.id,
        name: s.name,
        state_name: s.name,
        description: s.description || '',
        artifactCount: staticArtifacts.filter(a => a.stateId === s.id).length,
        artifact_count: staticArtifacts.filter(a => a.stateId === s.id).length,
        districtCount: staticDistricts.filter(d => d.stateId === s.id).length,
        district_count: staticDistricts.filter(d => d.stateId === s.id).length,
        isFallback: true
      }));
    }
  },

  // Get single state
  getState: async (stateId) => {
    if (!stateId) return null;
    try {
      const res = await fetchApi(`/states/${encodeURIComponent(stateId)}`);
      if (res && res.data) {
        const s = res.data;
        return {
          ...s,
          id: String(s.state_id || s.id),
          name: s.state_name || s.name,
          artifactCount: s.artifact_count ?? s.artifactCount ?? 0,
          districtCount: s.district_count ?? s.districtCount ?? 0
        };
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch state '${stateId}':`, err.message);
      const state = staticStates.find(s => s.id.toLowerCase() === stateId.toLowerCase() || String(s.name).toLowerCase() === stateId.toLowerCase());
      if (!state) return null;
      return {
        ...state,
        artifactCount: staticArtifacts.filter(a => a.stateId === state.id).length,
        districtCount: staticDistricts.filter(d => d.stateId === state.id).length,
        isFallback: true
      };
    }
  },

  // Get districts (optionally filtered by state)
  getDistricts: async (stateId = null) => {
    try {
      const endpoint = stateId && stateId !== 'all'
        ? `/districts/state/${encodeURIComponent(stateId)}`
        : '/districts';
      const res = await fetchApi(endpoint);
      if (res && res.data) {
        return res.data.map(d => ({
          ...d,
          id: String(d.district_id || d.id),
          name: d.district_name || d.name,
          stateId: String(d.state_id || d.stateId),
          artifactCount: d.artifact_count ?? d.artifactCount ?? 0
        }));
      }
    } catch (err) {
      console.warn('[HeritageArchive API] Failed to fetch districts:', err.message);
      let list = staticDistricts;
      if (stateId && stateId !== 'all') {
        list = list.filter(d => d.stateId.toLowerCase() === stateId.toLowerCase());
      }
      return list.map(d => ({
        ...d,
        artifactCount: staticArtifacts.filter(a => a.districtId === d.id).length,
        isFallback: true
      }));
    }
  },

  // Get single district
  getDistrict: async (districtId) => {
    if (!districtId) return null;
    try {
      const res = await fetchApi(`/districts/${encodeURIComponent(districtId)}`);
      if (res && res.data) {
        const d = res.data;
        return {
          ...d,
          id: String(d.district_id || d.id),
          name: d.district_name || d.name,
          stateId: String(d.state_id || d.stateId),
          artifactCount: d.artifact_count ?? d.artifactCount ?? 0
        };
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch district '${districtId}':`, err.message);
      const district = staticDistricts.find(d => d.id.toLowerCase() === districtId.toLowerCase());
      if (!district) return null;
      return {
        ...district,
        artifactCount: staticArtifacts.filter(a => a.districtId === district.id).length,
        isFallback: true
      };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const res = await fetchApi('/categories');
      const list = Array.isArray(res?.data)
        ? res.data
        : (Array.isArray(res) ? res : (Array.isArray(res?.items) ? res.items : []));

      if (list && list.length > 0) {
        return list.map(c => ({
          ...c,
          id: String(c.category_id || c.id),
          category_id: Number(c.category_id || c.id),
          name: c.category_name || c.name || '',
          category_name: c.category_name || c.name || '',
          description: c.description || '',
          artifactCount: Number(c.artifact_count ?? c.artifactCount ?? 0),
          artifact_count: Number(c.artifact_count ?? c.artifactCount ?? 0)
        }));
      }
      return [];
    } catch (err) {
      console.warn('[HeritageArchive API] Failed to fetch categories from backend:', err.message);
      return staticCategories.map(c => ({
        ...c,
        id: String(c.id),
        category_id: Number(c.id),
        name: c.name,
        category_name: c.name,
        description: c.description || '',
        artifactCount: staticArtifacts.filter(a => a.category === c.name).length,
        artifact_count: staticArtifacts.filter(a => a.category === c.name).length,
        isFallback: true
      }));
    }
  },

  // Get historical periods
  getHistoricalPeriods: async () => {
    return Promise.resolve(staticPeriods);
  },

  // Query artifacts with search, multi-criteria filtering, sorting, and pagination
  getArtifacts: async (params = {}) => {
    const {
      stateId = 'all',
      districtId = 'all',
      category = 'all',
      historicalPeriod = 'all',
      dynasty = 'all',
      material = 'all',
      search = '',
      sortBy = 'name-asc',
      page = 1,
      pageSize = 12
    } = params;

    try {
      // Build query string
      const qs = new URLSearchParams();
      if (stateId && stateId !== 'all') qs.set('stateId', stateId);
      if (districtId && districtId !== 'all') qs.set('districtId', districtId);
      if (category && category !== 'all') qs.set('category', category);
      if (historicalPeriod && historicalPeriod !== 'all') qs.set('period', historicalPeriod);
      if (dynasty && dynasty !== 'all') qs.set('dynasty', dynasty);
      if (material && material !== 'all') qs.set('material', material);
      if (search && search.trim() !== '') qs.set('search', search.trim());
      qs.set('sortBy', sortBy);
      qs.set('page', String(page));
      qs.set('limit', String(pageSize));

      const res = await fetchApi(`/artifacts/filter?${qs.toString()}`);
      if (res && res.items) {
        return {
          items: res.items.map(transformArtifact),
          totalCount: res.totalCount,
          page: res.page,
          pageSize: res.pageSize,
          hasMore: res.hasMore,
          source: 'database'
        };
      }
    } catch (err) {
      console.warn('[HeritageArchive API] Filter endpoint error, using static archive:', err.message);
      // Static fallback
      let filtered = [...staticArtifacts];

      if (stateId && stateId !== 'all') {
        filtered = filtered.filter(a => a.stateId.toLowerCase() === stateId.toLowerCase());
      }
      if (districtId && districtId !== 'all') {
        filtered = filtered.filter(a => a.districtId.toLowerCase() === districtId.toLowerCase());
      }
      if (category && category !== 'all') {
        filtered = filtered.filter(a => a.category.toLowerCase() === category.toLowerCase());
      }
      if (historicalPeriod && historicalPeriod !== 'all') {
        filtered = filtered.filter(a =>
          a.historicalPeriod.toLowerCase().includes(historicalPeriod.toLowerCase())
        );
      }
      if (dynasty && dynasty !== 'all') {
        filtered = filtered.filter(a =>
          a.dynasty.toLowerCase().includes(dynasty.toLowerCase())
        );
      }
      if (search && search.trim() !== '') {
        const q = search.toLowerCase().trim();
        filtered = filtered.filter(a =>
          (a.name && a.name.toLowerCase().includes(q)) ||
          (a.dynasty && a.dynasty.toLowerCase().includes(q)) ||
          (a.historicalPeriod && a.historicalPeriod.toLowerCase().includes(q)) ||
          (a.material && a.material.toLowerCase().includes(q)) ||
          (a.placeOfOrigin && a.placeOfOrigin.toLowerCase().includes(q)) ||
          (a.shortDescription && a.shortDescription.toLowerCase().includes(q)) ||
          (a.historicalDescription && a.historicalDescription.toLowerCase().includes(q)) ||
          (a.category && a.category.toLowerCase().includes(q)) ||
          (a.district && a.district.toLowerCase().includes(q)) ||
          (a.state && a.state.toLowerCase().includes(q))
        );
      }

      if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'name-desc') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      const totalCount = filtered.length;
      const startIndex = (page - 1) * pageSize;
      const paginatedItems = filtered.slice(0, startIndex + pageSize);

      return {
        items: paginatedItems.map(transformArtifact),
        totalCount,
        page,
        pageSize,
        hasMore: startIndex + pageSize < totalCount,
        source: 'static-fallback',
        error: err.message
      };
    }
  },

  // Get single artifact by ID
  getArtifactById: async (id) => {
    if (!id) return null;
    try {
      const res = await fetchApi(`/artifacts/${encodeURIComponent(id)}`);
      if (res && res.data) {
        return transformArtifact(res.data);
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch artifact '${id}':`, err.message);
      const found = staticArtifacts.find(a =>
        a.id.toLowerCase() === id.toLowerCase() ||
        String(a.rawId) === String(id)
      );
      return found ? transformArtifact(found) : null;
    }
  },

  // Get related artifacts (by same category, dynasty, or district)
  getRelatedArtifacts: async (id, limit = 3) => {
    try {
      const res = await fetchApi(`/artifacts/${encodeURIComponent(id)}/related?limit=${limit}`);
      if (res && res.items) {
        return res.items.map(transformArtifact);
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch related artifacts for '${id}':`, err.message);
      const current = staticArtifacts.find(a => a.id.toLowerCase() === id.toLowerCase());
      if (!current) return [];
      const related = staticArtifacts.filter(a =>
        a.id !== current.id &&
        (a.category === current.category || a.dynasty === current.dynasty || a.stateId === current.stateId)
      ).slice(0, limit);
      return related.map(transformArtifact);
    }
  },

  // Direct search endpoint GET /api/artifacts/search?q=...
  searchArtifacts: async (query, page = 1, limit = 12) => {
    try {
      const res = await fetchApi(`/artifacts/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      if (res && res.items) {
        return {
          items: res.items.map(transformArtifact),
          totalCount: res.totalCount,
          page: res.page,
          pageSize: res.pageSize,
          hasMore: res.hasMore,
          source: 'database'
        };
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Direct search failed for '${query}':`, err.message);
      return artifactService.getArtifacts({ search: query, page, pageSize: limit });
    }
  },

  // Get artifacts by district
  getArtifactsByDistrict: async (districtId) => {
    try {
      const res = await fetchApi(`/artifacts/district/${encodeURIComponent(districtId)}`);
      if (res && res.items) {
        return res.items.map(transformArtifact);
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch district artifacts for '${districtId}':`, err.message);
      return [];
    }
  },

  // Get artifacts by category
  getArtifactsByCategory: async (categoryId) => {
    try {
      const res = await fetchApi(`/artifacts/category/${encodeURIComponent(categoryId)}`);
      if (res && res.items) {
        return res.items.map(transformArtifact);
      }
    } catch (err) {
      console.warn(`[HeritageArchive API] Failed to fetch category artifacts for '${categoryId}':`, err.message);
      return [];
    }
  },

  // Get featured artifacts for landing hero
  getFeaturedArtifacts: async (limit = 4) => {
    try {
      const res = await fetchApi(`/artifacts/featured?limit=${limit}`);
      if (res && res.items) {
        return res.items.map(transformArtifact);
      }
    } catch (err) {
      console.warn('[HeritageArchive API] Failed to fetch featured artifacts:', err.message);
      const featuredIds = ['HA-TN-001', 'HA-TN-014', 'HA-AP-001', 'HA-TN-003'];
      const featured = staticArtifacts.filter(a => featuredIds.includes(a.id));
      return (featured.length > 0 ? featured : staticArtifacts.slice(0, limit)).map(transformArtifact);
    }
  }
};

/**
 * Authentication and User Service
 */
export const authService = {
  login: async (emailOrUsername, password) => {
    const raw = typeof emailOrUsername === 'string' ? emailOrUsername.trim() : '';
    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: raw,
        username: raw,
        password
      })
    });
    if (res?.token) {
      localStorage.setItem('heritage_auth_token', res.token);
      localStorage.setItem('heritage_auth_user', JSON.stringify(res.user));
    }
    return res;
  },

  register: async (userData) => {
    const rawFullName = userData.fullName || userData.full_name || '';
    const rawEmail = userData.email || '';
    const payload = {
      ...userData,
      fullName: rawFullName,
      full_name: rawFullName,
      email: rawEmail
    };
    const res = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res?.token) {
      localStorage.setItem('heritage_auth_token', res.token);
      localStorage.setItem('heritage_auth_user', JSON.stringify(res.user));
    }
    return res;
  },

  getMe: async () => {
    return fetchApi('/auth/me');
  },

  updateProfile: async (data) => {
    const rawFullName = data.fullName || data.full_name || '';
    const payload = {
      ...data,
      fullName: rawFullName,
      full_name: rawFullName
    };
    const res = await fetchApi('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    if (res?.user) {
      localStorage.setItem('heritage_auth_user', JSON.stringify(res.user));
    }
    return res;
  },

  getFavorites: async () => {
    return fetchApi('/auth/favorites');
  },

  addFavorite: async (artifactId) => {
    return fetchApi(`/auth/favorites/${artifactId}`, { method: 'POST' });
  },

  removeFavorite: async (artifactId) => {
    return fetchApi(`/auth/favorites/${artifactId}`, { method: 'DELETE' });
  },

  getAdminStats: async () => {
    return fetchApi('/auth/admin/stats');
  },

  logout: () => {
    localStorage.removeItem('heritage_auth_token');
    localStorage.removeItem('heritage_auth_user');
  },

  getToken: () => {
    return typeof window !== 'undefined' ? localStorage.getItem('heritage_auth_token') : null;
  },

  getUser: () => {
    try {
      const u = typeof window !== 'undefined' ? localStorage.getItem('heritage_auth_user') : null;
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  }
};
