# Station Display Components for Myanmar Railway Booking

This document describes the modal and carousel components for displaying stations along railway routes in the Myanmar Railway Booking system.

## Components Overview

We have implemented two main UI patterns for displaying stations along routes:

1. **Modal View** (`StationRouteModal`) - Full-screen detailed view
2. **Carousel View** (`StationRouteCarousel`) - Interactive slide navigation

## Installation & Setup

The components are located in `src/components/mmr/` and are ready to use. No additional dependencies are required.

## Available Components

### 1. StationRouteModal

A full-screen modal that displays all stations along a route with detailed information, timeline visualization, and progress tracking.

**Features:**
- Full-screen modal with backdrop
- Timeline visualization of stations
- Progress tracking and indicators
- Detailed station information
- Station facilities display
- Responsive design

**Usage:**
```typescript
import { StationRouteModal } from './components/mmr';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stations = [...] // Your stations data
  const currentStationIndex = 0;

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        View Stations
      </button>
      
      <StationRouteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        routeName="Yangon-Mandalay Express"
        stations={stations}
        currentStationIndex={currentStationIndex}
        trainNumber="UP01"
        departureTime="2026-07-26T08:00:00"
        arrivalTime="2026-07-26T18:30:00"
      />
    </>
  );
}
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Controls modal visibility |
| `onClose` | function | Yes | Callback when modal closes |
| `routeName` | string | Yes | Name of the railway route |
| `stations` | Station[] | Yes | Array of station objects |
| `currentStationIndex` | number | No | Index of current/selected station (default: 0) |
| `trainNumber` | string | No | Train number for display |
| `departureTime` | string | No | Departure time in ISO format |
| `arrivalTime` | string | No | Arrival time in ISO format |

### 2. StationRouteCarousel

An interactive carousel component for navigating through stations with slide controls and auto-play options.

**Features:**
- Interactive carousel navigation
- Auto-play option with pause/play controls
- Visual progress indicators
- Station details panel
- Responsive dot navigation
- Animated transitions

**Usage:**
```typescript
import { StationRouteCarousel } from './components/mmr';

function MyComponent() {
  const stations = [...] // Your stations data
  const currentStationIndex = 0;

  return (
    <StationRouteCarousel
      stations={stations}
      currentStationIndex={currentStationIndex}
      routeName="Yangon-Mandalay Express"
      showControls={true}
      onStationClick={(station, index) => {
        console.log(`Selected station: ${station.name}`);
      }}
      compact={false}
    />
  );
}
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stations` | Station[] | Yes | Array of station objects |
| `currentStationIndex` | number | No | Initial station index (default: 0) |
| `routeName` | string | No | Name of the railway route |
| `showControls` | boolean | No | Show navigation controls (default: true) |
| `onStationClick` | function | No | Callback when station is clicked |
| `compact` | boolean | No | Use compact styling (default: false) |

### 3. StationDisplayExample

A complete example component that integrates both modal and carousel views with real station data.

**Usage:**
```typescript
import { StationDisplayExample } from './components/mmr';

function MyPage() {
  return (
    <StationDisplayExample
      routeName="Yangon-Mandalay Express"
      trainNumber="UP01"
    />
  );
}
```

### 4. StationRouteDemo

A demonstration component showing both display options with mock data for testing and prototyping.

**Usage:**
```typescript
import { StationRouteDemo } from './components/mmr';

function DemoPage() {
  return <StationRouteDemo />;
}
```

## Station Data Interface

The components use the `Station` interface from `src/services/api.ts`:

```typescript
export interface Station {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
  platformCount?: string;
  facilities?: string;
}
```

## Integration Examples

### Integration with Search Results

When displaying train search results, you can add a "View Stations" button:

```typescript
function TrainResultCard({ train, stations }) {
  const [showStations, setShowStations] = useState(false);

  return (
    <div className="train-card">
      <h3>{train.trainName}</h3>
      <p>{train.sourceStation.city} → {train.destinationStation.city}</p>
      <button 
        onClick={() => setShowStations(true)}
        className="view-stations-btn"
      >
        View Stations along route
      </button>
      
      <StationRouteModal
        isOpen={showStations}
        onClose={() => setShowStations(false)}
        routeName={train.trainName}
        stations={stations}
        trainNumber={train.trainNumber}
        departureTime={train.departureTime}
        arrivalTime={train.arrivalTime}
      />
    </div>
  );
}
```

### Integration with Booking Flow

In the booking confirmation page, show stations along the route:

```typescript
function BookingConfirmation({ booking }) {
  const stations = getStationsAlongRoute(booking.sourceStation, booking.destinationStation);

  return (
    <div className="confirmation-page">
      <h2>Booking Confirmed</h2>
      <div className="route-info">
        <StationRouteCarousel
          stations={stations}
          routeName={`${booking.sourceStation.city} to ${booking.destinationStation.city}`}
          trainNumber={booking.train.trainNumber}
        />
      </div>
    </div>
  );
}
```

## Styling & Customization

The components use Tailwind CSS classes and can be customized:

### Custom CSS Classes

You can override styles using CSS:

```css
/* Custom modal styling */
.custom-modal .station-dot {
  @apply w-14 h-14;
}

/* Custom carousel styling */
.custom-carousel .station-card {
  @apply bg-gradient-to-r from-blue-50 to-emerald-50;
}
```

### Responsive Design

The components are fully responsive:

- **Mobile**: Stacked layout, simplified controls
- **Tablet**: Adjusted spacing, optimized layouts
- **Desktop**: Full feature set, optimal spacing

## Best Practices

1. **Use Modal for Detailed Views**: When users need comprehensive station information
2. **Use Carousel for Navigation**: When users need to browse stations quickly
3. **Pre-fetch Station Data**: Load station data before showing components
4. **Handle Empty States**: Show appropriate messages when no stations are available
5. **Accessibility**: All components include proper ARIA labels and keyboard navigation

## Performance Considerations

- **Lazy Loading**: Consider lazy loading the modal/carousel for better initial load times
- **Virtualization**: For routes with many stations (>20), consider virtualized lists
- **Image Optimization**: If adding station images, use optimized formats

## Browser Support

The components support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- **Keyboard Navigation**: Full keyboard support (arrow keys, Enter, Escape)
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Focus trapping in modals
- **Color Contrast**: Meets WCAG AA standards

## Testing

To test the components:

1. **Demo Component**: Use `StationRouteDemo` for quick testing
2. **Mock Data**: Use the mock stations data in the demo
3. **Integration**: Test with real API data using `StationDisplayExample`

## Troubleshooting

### Common Issues

1. **Modal doesn't open**: Ensure `isOpen` prop is `true`
2. **Stations not showing**: Verify stations array is not empty
3. **Style issues**: Check Tailwind CSS is properly configured
4. **Type errors**: Ensure Station interface matches your data

### Debugging Tips

```typescript
// Check station data
console.log('Stations:', stations);
console.log('Station count:', stations.length);

// Check modal state
console.log('Modal open:', isModalOpen);
```

## Future Enhancements

Potential improvements:
1. **Offline Support**: Cache station data for offline viewing
2. **Map Integration**: Show stations on an interactive map
3. **Real-time Updates**: Live station status updates
4. **Custom Themes**: Theme support for different railway lines
5. **Export Options**: Export station list as PDF/CSV

## Support

For issues or questions:
1. Check the component documentation
2. Review the example implementations
3. Test with the demo components
4. Contact the development team

---

*Last Updated: July 28, 2026*