import { describe, expect, it } from 'vitest'
import HomeView from "./HomeView.tsx";
import { render } from '@testing-library/react';

describe('HomeView', () => {
    it('Snapshot', () => {
        const { asFragment } = render(<HomeView />);
        expect(asFragment()).toMatchFileSnapshot('./__snapshots__/HomeView.snapshot.html');
    });
});