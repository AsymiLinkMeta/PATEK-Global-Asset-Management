import { useState } from 'react';
import { ArrowLeft, MapPin, Search, Clock, Phone, Navigation, Filter, Building2, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type LocationType = 'all' | 'branch' | 'atm';

interface Location {
  id: string;
  name: string;
  type: 'branch' | 'atm';
  address: string;
  city: string;
  distance: string;
  hours?: string;
  phone?: string;
  services: string[];
  isOpen: boolean;
}

const mockLocations: Location[] = [
  {
    id: '1', name: 'Chase Branch - Brickell Ave', type: 'branch',
    address: '701 Brickell Ave', city: 'Miami, FL 33131', distance: '0.2 mi',
    hours: 'Mon-Fri 9AM-6PM, Sat 9AM-2PM', phone: '(305) 347-8000',
    services: ['ATM', 'Safe Deposit', 'Notary', 'Private Client', 'Mortgage'],
    isOpen: true
  },
  {
    id: '2', name: 'Chase ATM - Brickell City Centre', type: 'atm',
    address: '701 S Miami Ave', city: 'Miami, FL 33131', distance: '0.3 mi',
    hours: '24 hours', services: ['Deposit', 'Withdrawal', 'Cardless'],
    isOpen: true
  },
  {
    id: '3', name: 'Chase Branch - Downtown Miami', type: 'branch',
    address: '1 SE 3rd Ave', city: 'Miami, FL 33131', distance: '0.7 mi',
    hours: 'Mon-Fri 9AM-6PM, Sat 9AM-1PM', phone: '(305) 579-2300',
    services: ['ATM', 'Safe Deposit', 'Business Banking'],
    isOpen: true
  },
  {
    id: '4', name: 'Chase ATM - Walgreens', type: 'atm',
    address: '100 SE 2nd St', city: 'Miami, FL 33131', distance: '0.8 mi',
    hours: '24 hours', services: ['Withdrawal', 'Balance Inquiry'],
    isOpen: true
  },
  {
    id: '5', name: 'Chase Branch - Coral Gables', type: 'branch',
    address: '2301 Ponce de Leon Blvd', city: 'Coral Gables, FL 33134', distance: '3.2 mi',
    hours: 'Mon-Fri 9AM-6PM, Sat 9AM-2PM', phone: '(305) 442-4100',
    services: ['ATM', 'Safe Deposit', 'Notary', 'Mortgage', 'Investments'],
    isOpen: false
  },
  {
    id: '6', name: 'Chase ATM - Coconut Grove', type: 'atm',
    address: '2999 S Bayshore Dr', city: 'Miami, FL 33133', distance: '3.8 mi',
    hours: '24 hours', services: ['Deposit', 'Withdrawal', 'Cardless'],
    isOpen: true
  },
  {
    id: '7', name: 'Chase Branch - Miami Beach', type: 'branch',
    address: '1691 Michigan Ave', city: 'Miami Beach, FL 33139', distance: '5.1 mi',
    hours: 'Mon-Fri 9AM-5PM, Sat 9AM-1PM', phone: '(305) 695-3500',
    services: ['ATM', 'Business Banking', 'Notary'],
    isOpen: false
  },
];

export default function ATMLocator() {
  const [searchQuery, setSearchQuery] = useState('Miami, FL');
  const [locationType, setLocationType] = useState<LocationType>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filtered = mockLocations.filter(loc =>
    locationType === 'all' || loc.type === locationType
  );

  if (selectedLocation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => setSelectedLocation(null)}
              className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">{selectedLocation.name}</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-4">
          <div className="bg-gray-200 rounded-xl h-48 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{selectedLocation.address}</p>
              <p className="text-sm text-gray-600">{selectedLocation.city}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${selectedLocation.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-sm font-medium ${selectedLocation.isOpen ? 'text-green-700' : 'text-red-700'}`}>
                {selectedLocation.isOpen ? 'Open now' : 'Closed'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">{selectedLocation.address}</p>
                  <p className="text-sm text-gray-600">{selectedLocation.city}</p>
                </div>
              </div>

              {selectedLocation.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="text-sm text-gray-700">{selectedLocation.hours}</p>
                </div>
              )}

              {selectedLocation.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <p className="text-sm text-primary-600 font-medium">{selectedLocation.phone}</p>
                </div>
              )}

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-700">{selectedLocation.distance} away</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Available Services</h3>
            <div className="flex flex-wrap gap-2">
              {selectedLocation.services.map((service, i) => (
                <span key={i} className="px-3 py-1.5 bg-blue-50 text-primary-700 text-xs font-medium rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-primary-600 text-white py-3 rounded-full font-medium hover:bg-primary-700 transition-colors text-sm">
              Get directions
            </button>
            {selectedLocation.phone && (
              <button className="flex-1 border-2 border-primary-600 text-primary-600 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors text-sm">
                Call branch
              </button>
            )}
          </div>

          {selectedLocation.type === 'branch' && (
            <button className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">Schedule a meeting</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#005EB8] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link to="/dashboard" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold">Find ATM & Branch</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="City, state, or ZIP code"
            className="w-full pl-10 pr-4 py-3 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex gap-2">
          {[
            { key: 'all' as LocationType, label: 'All', icon: MapPin },
            { key: 'branch' as LocationType, label: 'Branches', icon: Building2 },
            { key: 'atm' as LocationType, label: 'ATMs', icon: CreditCard },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setLocationType(item.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                locationType === item.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6">
        <div className="bg-gray-200 rounded-xl h-44 flex items-center justify-center mb-4">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Map view</p>
            <p className="text-xs text-gray-500">{filtered.length} locations nearby</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">{filtered.length} locations near {searchQuery}</h2>
          <button className="flex items-center gap-1 text-xs text-primary-600 font-medium">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
        </div>

        <div className="space-y-3">
          {filtered.map(location => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="w-full bg-white rounded-xl border border-gray-200 p-4 text-left hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    location.type === 'branch' ? 'bg-blue-50' : 'bg-gray-100'
                  }`}>
                    {location.type === 'branch' ? (
                      <Building2 className="w-5 h-5 text-primary-600" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-gray-900">{location.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{location.address}, {location.city}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`flex items-center gap-1 text-xs ${location.isOpen ? 'text-green-600' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${location.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                        {location.isOpen ? 'Open' : 'Closed'}
                      </span>
                      <span className="text-xs text-gray-400">{location.distance}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3 ml-13">
                {location.services.slice(0, 3).map((service, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                    {service}
                  </span>
                ))}
                {location.services.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded">
                    +{location.services.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
