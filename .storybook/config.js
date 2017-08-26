import { configure } from '@storybook/react';
import '@storybook/addon-chapters';
import loadDirectories from 'storybook-directory-chapters';

const context = require.context('../src/components', true, /.stories.js$/);

function loadStories() {
  loadDirectories(context);
}

configure(loadStories, module);
