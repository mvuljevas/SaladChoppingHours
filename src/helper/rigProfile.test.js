import assert from "node:assert/strict";
import test from "node:test";
import { buildOptimizationPlan } from "./rigProfile.js";

test("recommends max availability actions from detected rig hardware", () => {
  const plan = buildOptimizationPlan({
    machine: {
      hostname: "VICTUS",
    },
    cpu: {
      logicalProcessors: 16,
    },
    memory: {
      totalGb: 64,
    },
    gpus: [
      {
        name: "NVIDIA GeForce RTX 4070 Laptop GPU",
        vendor: "nvidia",
        type: "dedicated",
        memoryMb: 8188,
      },
      {
        name: "AMD Radeon Graphics",
        vendor: "amd",
        type: "integrated",
        memoryMb: 2048,
      },
    ],
    power: {
      name: "Balanced",
    },
    virtualization: {
      hypervisorPresent: true,
      wslAvailable: true,
      saladDistro: {
        running: false,
      },
    },
    salad: {
      serviceDetected: true,
    },
    elevation: {
      isAdmin: false,
    },
  });

  assert.equal(plan.score, 100);
  assert.equal(
    plan.actions.some((action) => action.id === "windows-power-plan"),
    true,
  );
  assert.equal(
    plan.actions.some((action) => action.id === "nvidia-prefer-dgpu"),
    true,
  );
  assert.equal(
    plan.actions.some((action) => action.id === "wsl-runtime-ready"),
    true,
  );
});
