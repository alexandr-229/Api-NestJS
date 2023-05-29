import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { JustJoinItData } from '../page/page.model';
import { API_URL, INVALID_RESPONSE_ERROR } from './justjoinit.const';
import { JustJoinItResponse } from './justjoinit.models';

@Injectable()
export class JustjoinitService {

	constructor(
		private readonly httpService: HttpService
	) { }

	async getData(text: string) {
		try {
			const response = await this.httpService.get<JustJoinItResponse[]>(API_URL.vacancies, {
				params: {
					'skills[]': text
				}
			}).toPromise();
			if(!response?.data) {
				throw new Error(INVALID_RESPONSE_ERROR);
			}
			const result = this.parseData(response.data);
			return result;
		} catch(e) {
			Logger.error(e);
		}
 	}

	private parseData(data: JustJoinItResponse[]): JustJoinItData {
		const averageSalary = data.reduce((total: number, item: JustJoinItResponse) => {
			const from = item?.employment_types[0].salary?.from;
			const to = item?.employment_types[0].salary?.to;
			const avgItemSalary = (from + to) / 2;
			return from && to ? total += avgItemSalary : total;
		}, 0) / data.length;
		if(!data.length) {
			return {
				count: 0,
				updatedAt: new Date(),
				juniorSalary: 0,
				middleSalary: 0,
				seniorSalary: 0
			};
		}
		const result: JustJoinItData = {
			count: data.length,
			updatedAt: new Date(),
			juniorSalary: Math.round((averageSalary / 1.5) / 100) * 100,
			middleSalary: Math.round((averageSalary) / 100) * 100,
			seniorSalary: Math.round((averageSalary * 2) / 100) * 100
		};
		return result;
	}
}
