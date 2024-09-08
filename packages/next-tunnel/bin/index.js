import chalk from 'chalk';
import boxen from 'boxen';
import qrcode from 'qrcode-terminal';
import { startTunnel } from 'untun';
import { spawn } from 'child_process';
let tunnel;
export async function startTunnelForNext(options) {
    const port = options.port; // Default to 3000 if no port is specified
    console.log(chalk.blue.bold('Starting dev on port...'), chalk.green.bold(port));
    if (typeof port !== 'number' || isNaN(port) || port < 0 || port >= 65536) {
        throw new Error(chalk.red.bold('Port must be a valid number between 0 and 65535'));
    }
    const nextProcess = spawn('npx', ['next', 'dev', '-p', port.toString()], {
        stdio: 'inherit',
        shell: true,
    });
    nextProcess.on('close', (code) => {
        console.log(chalk.red(`Next.js process exited with code ${code}`));
        stopTunnel();
    });
    const tunnelConfig = {
        port,
        subdomain: options.subdomain,
    };
    try {
        const tunnel = await startTunnel(tunnelConfig);
        const url = await tunnel?.getURL() || '';
        console.log(boxen(`Local: http://localhost:${port}`, { padding: 1, borderColor: 'green', title: 'Local URL' }));
        console.log(boxen(`External: ${url}`, { padding: 1, borderColor: 'cyan', title: 'Tunnel URL' }));
        qrcode.generate(url, { small: true }, (code) => {
            console.log(chalk.yellow('\nQR Code for accessing the tunnel:'));
            console.log(code);
        });
    }
    catch (error) {
        console.error(chalk.red('Error starting tunnel:', error));
        stopTunnel();
        nextProcess.kill();
    }
}
export async function stopTunnel() {
    if (tunnel) {
        await tunnel.close();
    }
}
