import { describe, expect, test } from "@jest/globals";
import { runDfuTargeted } from "./util/dfu";

/**
 * Basic tests that should work with a sample device connected via USB.
 *
 * No side channel verification with avrdude.
 */

describe("Basic Communication with Hardware", () => {
  let testSeparatorDelay: Promise<void>;
  afterEach(() => {
    // Wait 600ms between each test to ensure the hardware is stable
    testSeparatorDelay = new Promise((resolve) => setTimeout(resolve, 600).unref());
  });
  beforeEach(() => testSeparatorDelay);

  test("Command: reset", async () => {
    const run = runDfuTargeted(["reset"]);
    const exitCode = await run.exitCode;
    const { stdout, stderr } = run;

    expect(exitCode).toBe(0);
    expect(stdout).toBe("");
    expect(stderr).toBe("");
  });

  test("Command: launch", async () => {
    const run = runDfuTargeted(["launch"]);
    const exitCode = await run.exitCode;
    const { stdout, stderr } = run;

    expect(exitCode).toBe(0);
    expect(stdout).toBe("");
    expect(stderr).toBe("");
  });

  test("Device missing", async () => {
    {
      // MAYBE: Use reset.sh script instead of this block
      const run = runDfuTargeted(["reset"]);
      const exitCode = await run.exitCode;
      const { stdout, stderr } = run;
      expect(exitCode).toBe(0);
      expect(stdout).toBe("");
      expect(stderr).toBe("");
    }

    {
      const run = runDfuTargeted(["launch"]);
      const exitCode = await run.exitCode;
      const { stdout, stderr } = run;
      expect(exitCode).toBe(3);
      expect(stdout).toBe("");
      expect(stderr).toBe("dfu-programmer: no device present.\n");
    }
  });
});