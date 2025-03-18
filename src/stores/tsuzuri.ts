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
    emotion: string;
    update_date: string;
}

export interface CreateData {
    userid: string;
    tdate: string;
    what: string;
    how: string;
    why: string;
    emotion: string;
}

export const useTsuzuriStore = defineStore('tsuzuri', {
    state: () => ({
        userid: undefined as string | undefined,
        tsuzuriList: [] as TsuzuriData[]
    }),
    actions: {
        setUser(userid: string) {
            this.userid = userid;
        },
        async fetchTsuzuri() {
            try {
                // const response = await axios.get(config.apiUrl + `/api/list/${userid}`); // ユーザー ID を URL に含める
                const response = await axios.get(config.apiUrl + `/api/list/${this.userid}`); // ユーザー ID を URL に含める
                this.tsuzuriList = response.data.tsuzuri;
                console.log('tsuzuriList', this.tsuzuriList)
            } catch (error) {
                console.error('Failed to fetch tsuzuri data:', error);
            }
        },
        async createTsuzuri(tsuzuri: CreateData) {
            try {
                console.log('createTsuzuri', tsuzuri)
                await axios.post(`${config.apiUrl}/api/tsuzuri`, tsuzuri);
                console.log('tsuzuri を登録しました。');
            } catch (error) {
                console.error('tsuzuri の登録に失敗しました。', error);
            }
        },
        async updateTsuzuri(tsuzuri: CreateData, id: number) {
            try {
                console.log('updateTsuzuri', tsuzuri, id)
                await axios.put(`${config.apiUrl}/api/tsuzuri/${id}`, tsuzuri);
                console.log('tsuzuri を更新しました。');
            } catch (error) {
                console.error('tsuzuri の更新に失敗しました。', error);
            }
        },
        deleteTsuzuri(id: number) {
            this.tsuzuriList = this.tsuzuriList.filter((tsuzuri) => tsuzuri.id !== id);
        },
    },
});