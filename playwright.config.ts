import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
  testDir: `./e2e`,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: `list`,
  webServer: {
    command: `yarn serve`,
    port: 9000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    actionTimeout: 0,
    trace: `on-first-retry`,
  },
  projects: [
    {
      name: `chromium`,
      use: {
        ...devices[`Desktop Chrome`],
      },
    },
  ],
}

export default config
