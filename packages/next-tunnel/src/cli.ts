#!/usr/bin/env node
import { Command } from 'commander';
import { startTunnelForNext, stopTunnel } from './index.js';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('Next.js LocalTunnel CLI');

program
  .command('dev')
  .description('Start the local tunnel and Next.js app')
  .option('-p, --port <port>', 'Port number', (value) => parseInt(value, 10), 3000) // Corrected the parser here
  .option('-s, --subdomain <subdomain>', 'Subdomain')
  .action(async (cmd) => {
    const port = cmd.port;
    await startTunnelForNext({
      port,
      subdomain: cmd.subdomain,
    });
  });

program
  .command('stop')
  .description('Stop the local tunnel')
  .action(async () => {
    await stopTunnel();
  });

// Command to initialize next-tunnel in the package.json
program
  .command('init')
  .description('Modify package.json to use next-tunnel')
  .action(() => {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');

    try {
      // Read package.json file
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // Update the dev script
      if (packageJson.scripts && packageJson.scripts.dev) {
        packageJson.scripts.dev = 'next-tunnel dev';
      } else {
        // If no dev script exists, add one
        packageJson.scripts = {
          ...packageJson.scripts,
          dev: 'next-tunnel dev',
        };
      }

      // Write the updated package.json back
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

      console.log('✅ package.json updated: "dev" script changed to "next-tunnel dev"');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ Failed to update package.json:', error.message);
      } else {
        console.error('❌ Failed to update package.json: Unknown error');
      }
    }
  });

program.parse(process.argv);
