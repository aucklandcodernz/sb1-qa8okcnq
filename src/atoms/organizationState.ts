
import { atom } from 'jotai';
import { Organization } from '../types/organization';

export const organizationsAtom = atom<Record<string, Organization>>({});
export const selectedOrganizationAtom = atom<string | null>(null);
