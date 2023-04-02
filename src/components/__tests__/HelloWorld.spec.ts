import { render } from '@testing-library/vue';
import type { Slot } from '@vue/test-utils/dist/types';
import { describe, it, expect } from 'vitest';

import HelloWorld from '@/components/HelloWorld.vue';

const createContainerFactory = (
  optionalProps?: Partial<{ msg: string }>,
  slots?: Record<string, Slot>,
) => {
  return render(HelloWorld, {
    props: { msg: 'Hello Vitest', ...optionalProps },
    slots: slots ?? slots,
  });
};

describe('HelloWorld', () => {
  it('renders properly', () => {
    const { html } = createContainerFactory();

    expect(html()).toContain('Hello Vitest');
  });

  it('has the expected html structure', () => {
    expect.assertions(1);

    const { html } = createContainerFactory();

    expect(html()).toMatchSnapshot();
  });
});
