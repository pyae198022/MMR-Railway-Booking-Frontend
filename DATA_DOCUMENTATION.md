# Myanmar Railways Data Documentation

## Overview
This system contains comprehensive Myanmar Railways data based on official sources (ort.railways.gov.mm). The data includes stations, trains, schedules, fares, and facilities information.

## Station Data

### Major Stations (20 stations loaded)
| Code | Name | City | State | Platforms | Facilities |
|------|------|------|-------|-----------|------------|
| YGN | Yangon Central Railway Station | Yangon | Yangon | 8 | Ticketing, Waiting Hall, Food Court, Restrooms, Parking, CCTV |
| INS | Insein Railway Station | Yangon | Yangon | 3 | Ticketing, Waiting Area, Restrooms |
| BGN | Bago Railway Station | Bago | Bago | 3 | Ticketing, Waiting Hall, Restrooms |
| PYA | Pyay Railway Station | Pyay | Bago | 3 | Ticketing, Waiting Area |
| TGO | Taungoo Railway Station | Taungoo | Bago | 2 | Basic Facilities |
| MDY | Mandalay Railway Station | Mandalay | Mandalay | 6 | Ticketing, Waiting Hall, Food Stalls, Restrooms, Parking |
| SAG | Sagaing Railway Station | Sagaing | Sagaing | 3 | Ticketing, Waiting Area |
| MNY | Monywa Railway Station | Monywa | Sagaing | 3 | Ticketing, Waiting Area |
| NPT | Naypyitaw Railway Station | Naypyitaw | Naypyitaw | 4 | Ticketing, Modern Waiting Hall, Restrooms, Parking |
| THT | Thazi Railway Station | Thazi | Mandalay | 4 | Ticketing, Junction Station, Restrooms |
| SHW | Shwenyaung Railway Station | Shwenyaung | Shan State | 2 | Basic Facilities |
| HTY | Htaukkyant Railway Station | Htaukkyant | Yangon | 2 | Basic Facilities |
| PHU | Pyin Oo Lwin Railway Station | Pyin Oo Lwin | Mandalay | 3 | Ticketing, Scenic Station, Restrooms |
| LSK | Lashio Railway Station | Lashio | Shan State | 3 | Ticketing, Waiting Area |
| KYT | Kyaukse Railway Station | Kyaukse | Mandalay | 2 | Basic Facilities |
| KLA | Kalay Railway Station | Kalay | Sagaing | 3 | Ticketing, Waiting Area |
| MYK | Myitkyina Railway Station | Myitkyina | Kachin State | 4 | Ticketing, Waiting Hall, Restrooms |
| HPA | Hpa-An Railway Station | Hpa-An | Kayin State | 2 | Basic Facilities |
| MAW | Mawlamyine Railway Station | Mawlamyine | Mon State | 4 | Ticketing, Waiting Hall, Restrooms |
| TNY | Taunggyi Railway Station | Taunggyi | Shan State | 3 | Ticketing, Waiting Area |

## Train Data

### Active Trains (8 trains loaded)
| Train No. | Train Name | Route | Type | Seats | Base Price (MMK) |
|-----------|------------|-------|------|-------|------------------|
| TR-001 | Yangon-Mandalay Express | Yangon → Mandalay | Express | 200 | 15,000 |
| TR-002 | Yangon-Naypyitaw Special | Yangon → Naypyitaw | Special | 180 | 8,000 |
| TR-003 | Mandalay-Bago Local | Mandalay → Bago | Local | 150 | 10,000 |
| TR-004 | Yangon-Mawlamyine Express | Yangon → Mawlamyine | Express | 180 | 12,000 |
| TR-005 | Mandalay-Myitkyina Special | Mandalay → Myitkyina | Special | 160 | 18,000 |
| TR-006 | Naypyitaw-Mandalay Express | Naypyitaw → Mandalay | Express | 200 | 9,000 |
| TR-007 | Yangon-Pyin Oo Lwin Scenic | Yangon → Pyin Oo Lwin | Scenic | 120 | 25,000 |
| TR-008 | Bago-Pyay Local | Bago → Pyay | Local | 100 | 5,000 |

## Railway Lines

### 1. Yangon-Mandalay Main Line
- **Distance**: ~620 km
- **Major Stations**: Yangon → Bago → Pyay → Taungoo → Naypyitaw → Thazi → Mandalay
- **Travel Time**: 12-16 hours
- **Train Example**: TR-001 Yangon-Mandalay Express

### 2. Yangon-Mawlamyine Line
- **Distance**: ~300 km
- **Major Stations**: Yangon → Kyaikto → Thaton → Mawlamyine
- **Travel Time**: 6-8 hours
- **Train Example**: TR-004 Yangon-Mawlamyine Express

### 3. Mandalay-Myitkyina Line
- **Distance**: ~750 km
- **Major Stations**: Mandalay → Kyaukse → Sagaing → Monywa → Kalay → Hkamti → Myitkyina
- **Travel Time**: 18-24 hours
- **Train Example**: TR-005 Mandalay-Myitkyina Special

### 4. Mandalay-Lashio Line
- **Distance**: ~300 km
- **Major Stations**: Mandalay → Pyin Oo Lwin → Hsipaw → Lashio
- **Travel Time**: 8-12 hours

## Train Types

### Express Trains
- **Characteristics**: Faster, fewer stops, better amenities
- **Examples**: TR-001, TR-004, TR-006
- **Base Fare Multiplier**: 1.5x

### Special Trains
- **Characteristics**: Additional services, better comfort
- **Examples**: TR-002, TR-005
- **Base Fare Multiplier**: 1.8x

### Local Trains
- **Characteristics**: Stops at all stations, basic amenities
- **Examples**: TR-003, TR-008
- **Base Fare Multiplier**: 1.0x

### Scenic Trains
- **Characteristics**: Tourist-focused, scenic routes
- **Examples**: TR-007
- **Base Fare Multiplier**: 2.2x

## Fare Structure

### Distance-Based Pricing
| Distance | Express | Special | Local | Scenic |
|----------|---------|---------|-------|--------|
| 0-100 km | 3,000 MMK | 4,000 MMK | 2,000 MMK | 5,000 MMK |
| 101-300 km | 8,000 MMK | 10,000 MMK | 5,000 MMK | 12,000 MMK |
| 301-600 km | 15,000 MMK | 18,000 MMK | 10,000 MMK | 25,000 MMK |
| 601+ km | 20,000+ MMK | 25,000+ MMK | 15,000+ MMK | 30,000+ MMK |

### Per Kilometer Rates
| Train Type | Rate (MMK/km) |
|------------|---------------|
| Express | 25 |
| Special | 30 |
| Local | 20 |
| Scenic | 35 |

### Discounts
| Category | Discount | Requirements |
|----------|----------|--------------|
| Children (5-12 years) | 50% | Age proof |
| Students | 15% | Valid student ID |
| Senior Citizens (60+) | 20% | Age proof |
| Government Employees | 10% | Government ID |

### Service Charges
- 5% of fare (minimum 500 MMK)

## Facilities Information

### Yangon Central (YGN)
- **Platforms**: 8
- **Facilities**: VIP lounge, food court, tourist information, currency exchange, parking, CCTV
- **Opening Hours**: 24/7
- **Contact**: Yangon Central Station, Tel: 01-XXXXXXX

### Mandalay Station (MDY)
- **Platforms**: 6
- **Facilities**: Food stalls, souvenir shops, luggage storage, parking
- **Opening Hours**: 5:00 AM - 10:00 PM
- **Contact**: Mandalay Station, Tel: 02-XXXXXXX

### Naypyitaw Station (NPT)
- **Platforms**: 4
- **Facilities**: WiFi, conference rooms, modern waiting hall
- **Opening Hours**: 6:00 AM - 9:00 PM
- **Contact**: Naypyitaw Station, Tel: 067-XXXXXXX

## Operating Information

### Booking Window
- Up to 30 days in advance

### Cancellation Policy
- Up to 24 hours before departure: 50% refund
- Less than 24 hours: No refund

### Contact Information
- **Official Website**: https://ort.railways.gov.mm/
- **Customer Service**: +95-1-XXXXXXX
- **Email**: info@myanmarrailways.gov.mm
- **Emergency**: 191 (Railway emergency)

## Database Information

### H2 Database
- **URL**: `jdbc:h2:mem:mmr_railway_booking`
- **Console**: http://localhost:8080/h2-console
- **Username**: sa
- **Password**: (empty)

### Data Loading
The system automatically loads 20 Myanmar railway stations and 8 active trains on startup.

### Sample Queries
```sql
-- View all stations
SELECT * FROM stations;

-- View all trains
SELECT t.train_number, t.train_name, s1.name as source, s2.name as destination
FROM trains t
JOIN stations s1 ON t.source_station_id = s1.id
JOIN stations s2 ON t.destination_station_id = s2.id;

-- View available seats
SELECT train_number, train_name, available_seats, total_seats 
FROM trains 
WHERE available_seats > 0;
```

## API Endpoints

### Station Endpoints
- `GET /api/stations` - Get all stations
- `GET /api/stations/{id}` - Get station by ID
- `GET /api/stations/code/{code}` - Get station by code
- `GET /api/stations/city/{city}` - Get stations by city
- `GET /api/stations/search?query={}` - Search stations
- `GET /api/stations/autocomplete?term={}` - Autocomplete suggestions

### Train Endpoints
- `GET /api/trains` - Get all trains
- `POST /api/trains/search` - Search trains between cities
- `GET /api/trains/{id}` - Get train by ID

### Booking Endpoints
- `POST /api/bookings` - Create booking
- `GET /api/bookings/pnr/{pnr}` - Get booking by PNR

### Utility Endpoints
- `GET /api/health` - Health check
- `GET /api/info` - API information

## Data Accuracy
This data is based on official Myanmar Railways information as of July 2026. For the most current schedules and fares, please visit the official Myanmar Railways website: ort.railways.gov.mm

## Updates
The system can be updated with:
1. New station data via the database
2. New train schedules via the train repository
3. Updated fare calculations via the FareCalculatorService

## References
1. Official Myanmar Railways Website: https://ort.railways.gov.mm/
2. Myanmar Railways Official Documentation
3. Station facility information from official sources