// src/stores/tsuzuri.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import config from '@/utils/config';

export interface TsuzuriData {
    id: number;
    userid: string;
    tdate: string;
    what: string;
    how: string;
    why: string;
    // emotion: number[];
    emotion: string;
    create_date: string;
    change_date: string;
}

export const useTsuzuriStore = defineStore('tsuzuri', {
    state: () => ({
        tsuzuriList: [] as TsuzuriData[],
    }),
    actions: {
        async fetchTsuzuri(userid: string) { // ユーザー ID を引数に追加
            try {
                const response = await axios.get(config.apiUrl + `/api/list/${userid}`); // ユーザー ID を URL に含める
                this.tsuzuriList = response.data.tsuzuri;
            } catch (error) {
                console.error('Failed to fetch tsuzuri data:', error);
            }
        },
        addTsuzuri(tsuzuri: TsuzuriData) {
            this.tsuzuriList.push(tsuzuri);
        },
        updateTsuzuri(updatedTsuzuri: TsuzuriData) {
            const index = this.tsuzuriList.findIndex((tsuzuri) => tsuzuri.id === updatedTsuzuri.id);
            if (index !== -1) {
                this.tsuzuriList.splice(index, 1, updatedTsuzuri);
            }
        },
        deleteTsuzuri(id: number) {
            this.tsuzuriList = this.tsuzuriList.filter((tsuzuri) => tsuzuri.id !== id);
        },
    },
});