import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { RoleProvider, useRole } from '@/lib/role-context';
import { LocationProvider } from '@/lib/location-context';
import { LanguageProvider } from '@/lib/language-context';
import { LanguageScreen } from '@/screens/LanguageScreen';
import { LoginScreen } from '@/screens/LoginScreen';
import { Sidebar } from '@/components/Sidebar';
import { HomeScreen } from '@/screens/HomeScreen';
import { WorkerOnboarding } from '@/screens/WorkerOnboarding';
import { WorkerProfile } from '@/screens/WorkerProfile';
import { CustomerSearch } from '@/screens/CustomerSearch';
import { CustomerBookings } from '@/screens/CustomerBookings';
import { CustomerProfile } from '@/screens/CustomerProfile';
import { CustomerNotifications } from '@/screens/CustomerNotifications';
import { TermsAndConditions } from '@/screens/TermsAndConditions';
import { BookingConfirm } from '@/screens/BookingConfirm';
import { ServiceStatus } from '@/screens/ServiceStatus';
import { QRVerify } from '@/screens/QRVerify';
import { RadiusSetting } from '@/screens/RadiusSetting';
import { EarningsDashboard } from '@/screens/EarningsDashboard';
import { WorkerSchedule } from '@/screens/WorkerSchedule';
import type { Language } from '@/lib/language-context';

type AppStage = 'language' | 'login' | 'main';

function MainApp({ initialPath }: { initialPath: string }) {
  const { setRole, setIsWorker } = useRole();

  return (
    <BrowserRouter>
      <MainAppInner initialPath={initialPath} setRole={setRole} setIsWorker={setIsWorker} />
    </BrowserRouter>
  );
}

function MainAppInner({
  initialPath,
  setRole,
  setIsWorker,
}: {
  initialPath: string;
  setRole: (r: 'customer' | 'worker') => void;
  setIsWorker: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (initialPath !== '/') {
      navigate(initialPath, { replace: true });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-cream">
      <Sidebar />
      <div className="md:pl-64 min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/search" element={<CustomerSearch />} />
          <Route path="/bookings" element={<CustomerBookings />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/customer-notifications" element={<CustomerNotifications />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/profile" element={<EarningsDashboard />} />
          <Route path="/onboarding" element={<WorkerOnboarding />} />
          <Route path="/worker/:id" element={<WorkerProfile />} />
          <Route path="/worker-schedule" element={<WorkerSchedule />} />
          <Route path="/booking-confirm" element={<BookingConfirm />} />
          <Route path="/service-status" element={<ServiceStatus />} />
          <Route path="/qr-verify" element={<QRVerify />} />
          <Route path="/radius-setting" element={<RadiusSetting />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState<AppStage>('language');
  const [initialPath, setInitialPath] = useState('/');

  const handleLanguageSelect = (_lang: Language) => {
    setStage('login');
  };

  const handleLoginSuccess = (userType: 'customer' | 'worker', isNewUser: boolean) => {
    if (userType === 'worker' && isNewUser) {
      setInitialPath('/onboarding');
    } else if (userType === 'worker') {
      setInitialPath('/profile');
    } else {
      setInitialPath('/');
    }
    setStage('main');
  };

  if (stage === 'language') {
    return (
      <LanguageProvider>
        <LanguageScreen onSelect={handleLanguageSelect} />
      </LanguageProvider>
    );
  }

  if (stage === 'login') {
    return (
      <LanguageProvider>
        <LoginScreen onSuccess={handleLoginSuccess} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <RoleProvider>
        <LocationProvider>
          <MainApp initialPath={initialPath} />
        </LocationProvider>
      </RoleProvider>
    </LanguageProvider>
  );
}
