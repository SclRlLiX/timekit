import { writable } from 'svelte/store';
export const activeSection = writable<'work' | 'sleep'>('work');