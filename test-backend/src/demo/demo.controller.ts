import { Body, Controller, Post } from '@nestjs/common';

function unsafeDeepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  for (const key of Object.keys(source)) {
    const value = source[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      if (typeof target[key] !== 'object' || target[key] === null) {
        target[key] = {};
      }
      unsafeDeepMerge(
        target[key] as Record<string, unknown>,
        value as Record<string, unknown>,
      );
    } else {
      target[key] = value;
    }
  }
  return target;
}

@Controller('demo')
export class DemoController {
  @Post('merge')
  merge(@Body() body: Record<string, unknown>): Record<string, unknown> {
    // Vulnerable: request body is deep-merged with no prototype guard.
    return unsafeDeepMerge({}, body);
  }

  @Post('eval')
  run(@Body('code') code: string): { flagged: string } {
    if (process.env.ENABLE_UNSAFE_EVAL === 'true') {
      // eslint-disable-next-line no-eval
      eval(code);
    }
    return { flagged: 'eval(code) sink present for SAST; not executed' };
  }
}
