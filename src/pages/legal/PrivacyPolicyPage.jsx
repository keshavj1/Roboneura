import { privacyPolicy } from '../../data/legal';
import LegalPage from './LegalPage';

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
