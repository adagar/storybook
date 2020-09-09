import { getContext, setContext } from 'svelte';

const REGISTER = '__STORYBOOK_register';
const RENDER = '__STORYBOOK_render';
const ARGS = '__STORYBOOK_args';

export const setRegister = (value: any) => setContext(REGISTER, value);

export const getRegister = () => getContext(REGISTER);

export const setRender = (value: any) => setContext(RENDER, value);

export const getRender = () => getContext(RENDER);

export const setArgs = (value: any) => setContext(ARGS, value);

export const getArgs = () => getContext(ARGS);
