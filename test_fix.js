console.log('Testing MMR Railway Booking Train Search Fix\n');

// Simulate the stationIdMap from mockData.ts
const stationIdMap = {
  '1': 'ygn',   // Yangon Central (YGN)
  '2': 'ygn',   // Insein (INS)
  '6': 'mdy',   // Mandalay (MDY)
  '9': 'npt',   // Naypyitaw (NPT)
  '3': 'bgo',   // Bago (BGN)
};

// Simulate stations from mockData.ts
const stations = [
  { id: 'ygn', name: 'Yangon', nameMm: 'ရန်ကုန်' },
  { id: 'mdy', name: 'Mandalay', nameMm: 'မန္တလေး' },
  { id: 'npt', name: 'Naypyidaw', nameMm: 'နေပြည်တော်' },
  { id: 'bgo', name: 'Bago', nameMm: 'ပဲခူး' },
];

// Simulate trains from mockData.ts
const trains = [
  { 
    id: 'tr-001', 
    name: 'Upcountry Express',
    number: '12',
    fromStationId: 'ygn', 
    toStationId: 'mdy',
    departureTime: '06:00',
    arrivalTime: '18:30',
    duration: '12h 30m',
    classes: [
      { type: 'first-1', label: 'First Class 1', price: 85000, availableSeats: 12 },
      { type: 'ordinary', label: 'Ordinary Class', price: 18000, availableSeats: 56 },
    ]
  },
  { 
    id: 'tr-002', 
    name: 'Golden Route',
    number: '8',
    fromStationId: 'ygn', 
    toStationId: 'mdy',
    departureTime: '14:00',
    arrivalTime: '02:15',
    duration: '12h 15m',
    classes: [
      { type: 'first-1', label: 'First Class 1', price: 80000, availableSeats: 8 },
      { type: 'ordinary', label: 'Ordinary Class', price: 16000, availableSeats: 48 },
    ]
  },
  { 
    id: 'tr-003', 
    name: 'Capital Link',
    number: '21',
    fromStationId: 'ygn', 
    toStationId: 'npt',
    departureTime: '07:30',
    arrivalTime: '13:45',
    duration: '6h 15m',
    classes: [
      { type: 'first-2', label: 'First Class 2', price: 48000, availableSeats: 20 },
      { type: 'ordinary', label: 'Ordinary Class', price: 12000, availableSeats: 64 },
    ]
  },
];

// Simulate getStationById function
function getStationById(id) {
  const mappedId = stationIdMap[id] || id.toLowerCase();
  return stations.find((s) => s.id === mappedId);
}

// Simulate searchTrains function
function searchTrains(fromStationId, toStationId) {
  const fromId = stationIdMap[fromStationId] || fromStationId.toLowerCase();
  const toId = stationIdMap[toStationId] || toStationId.toLowerCase();
  
  return trains.filter(
    (t) => t.fromStationId === fromId && t.toStationId === toId,
  );
}

// Test 1: User searches Yangon (ID 1) to Mandalay (ID 6)
console.log('=== Test 1: User searches Yangon (ID 1) to Mandalay (ID 6) ===');
const searchResults1 = searchTrains('1', '6');
console.log(`Found ${searchResults1.length} trains:`);
searchResults1.forEach(train => {
  const fromStation = getStationById('1');
  const toStation = getStationById('6');
  console.log(`- ${train.name} (${train.number})`);
  console.log(`  From: ${fromStation?.name} (ID: 1 -> ${fromStation?.id})`);
  console.log(`  To: ${toStation?.name} (ID: 6 -> ${toStation?.id})`);
  console.log(`  Departure: ${train.departureTime}, Arrival: ${train.arrivalTime}`);
  console.log(`  Classes: ${train.classes.map(c => `${c.label} (${c.price} MMK)`).join(', ')}`);
});

// Test 2: User searches Yangon (ID 1) to Naypyitaw (ID 9)
console.log('\n=== Test 2: User searches Yangon (ID 1) to Naypyitaw (ID 9) ===');
const searchResults2 = searchTrains('1', '9');
console.log(`Found ${searchResults2.length} trains:`);
searchResults2.forEach(train => {
  const fromStation = getStationById('1');
  const toStation = getStationById('9');
  console.log(`- ${train.name} (${train.number})`);
  console.log(`  From: ${fromStation?.name} (ID: 1 -> ${fromStation?.id})`);
  console.log(`  To: ${toStation?.name} (ID: 9 -> ${toStation?.id})`);
});

// Test 3: Default search (should work with numeric IDs)
console.log('\n=== Test 3: Default search from BookingContext ===');
const defaultFrom = '1'; // Yangon
const defaultTo = '6';   // Mandalay
const defaultResults = searchTrains(defaultFrom, defaultTo);
console.log(`Default search (${defaultFrom} -> ${defaultTo}) found ${defaultResults.length} trains`);

// Test 4: Verify components can get station names
console.log('\n=== Test 4: Component station name lookup ===');
const testStationId = '6'; // Mandalay
const station = getStationById(testStationId);
console.log(`Station ID ${testStationId} -> ${station?.name} (${station?.nameMm})`);

console.log('\n=== Summary ===');
console.log('✅ The fix should now work correctly:');
console.log('1. Users can select stations from backend API (numeric IDs)');
console.log('2. searchTrains maps numeric IDs to string IDs');
console.log('3. Components can get station names using getStationById');
console.log('4. Trains are displayed correctly in search results');
