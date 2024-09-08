import { Button } from '@v1/ui';
import { getGoogleUrl } from '../../../lib/auth';
import Link from 'next/link'; // Use next/link for navigation
import { Linkedin } from 'lucide-react'; // Import the correct icon from lucide-react

export default function Page() {
  return (
    <div>
      <h1>Sign In</h1>
      <Button>
        <Link href={getGoogleUrl()} passHref>
          
            <Linkedin /> Sign In with Google
          
        </Link>
      </Button>
    </div>
  );
}
