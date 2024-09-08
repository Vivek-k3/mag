import {startTunnel} from 'untun'; // Assuming untunjs exposes a startTunnel method
import qrcode from 'qrcode-terminal';

export async function start(): Promise<string> {
  try {
    const tunnel = await startTunnel({ port: 3000 });
    return tunnel?.getURL() || '';
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to establish tunnel: ${err.message}`);
    }
    throw new Error('Failed to establish tunnel: Unknown error');
  }
}

export function generateQRCode(url: string): void {
  qrcode.generate(url, { small: true }, (code) => {
    console.log('\nQR Code for accessing the tunnel:');
    console.log(code);
  });
}
