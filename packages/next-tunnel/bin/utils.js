import { startTunnel } from 'untun'; // Assuming untunjs exposes a startTunnel method
import qrcode from 'qrcode-terminal';
export async function start() {
    try {
        const tunnel = await startTunnel({ port: 3000 });
        return tunnel?.getURL() || '';
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`Failed to establish tunnel: ${err.message}`);
        }
        throw new Error('Failed to establish tunnel: Unknown error');
    }
}
export function generateQRCode(url) {
    qrcode.generate(url, { small: true }, (code) => {
        console.log('\nQR Code for accessing the tunnel:');
        console.log(code);
    });
}
