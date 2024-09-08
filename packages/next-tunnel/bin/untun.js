import { exec } from 'child_process';
import { program } from 'commander';
import qrcode from 'qrcode-terminal';
program
    .command('start')
    .description('Start the tunnel')
    .option('-p, --port <port>', 'Port number', parseInt, 3000)
    .action((cmd) => {
    const port = cmd.port;
    if (isNaN(port) || port < 0 || port >= 65536) {
        console.error('Invalid port number. Port should be between 0 and 65535.');
        process.exit(1);
    }
    // Start untun process
    const tunnel = exec(`untun -p ${port}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting tunnel: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }
        // Output public URL
        const url = stdout.trim(); // Adjust this based on `untun` output format
        console.info(`  > External: ${url}\n`);
        // Generate QR code
        qrcode.generate(url, { small: true }, (code) => {
            console.log('\nQR Code for accessing the tunnel:');
            console.log(code);
        });
    });
});
program.parse(process.argv);
