// @flow

import type { StyleSpecification } from '../../src/style-spec/types';
import fs from 'fs';
import pify from 'pify';
import { normalizeStyleURL } from '../../src/util/mapbox';

export default function fetchStyle(value: string): Promise<StyleSpecification> {
    if (value.match(/\.json/)) {
        return pify(fs.readFile)(value, 'utf8')
            .then(response => JSON.parse(response));
    } else {
        return fetch(normalizeStyleURL(value))
            .then(response => response.json());
    }
}
