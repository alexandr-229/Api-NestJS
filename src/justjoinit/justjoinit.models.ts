export interface JustJoinItResponse {
	title: string;
	street: string;
	city: string;
	country_code: string;
	address_text: string;
	marker_icon: string;
	workplace_type: string;
	company_name: string;
	company_url: string;
	company_size: string;
	experience_level: string;
	latitude: string;
	longitude: string;
	published_at: string;
	remote_interview: boolean;
	open_to_hire_ukrainians: boolean;
	id: string;
	display_offer: boolean;
	employment_types: EmploymentType[];
	company_logo_url: string;
	skills: Skill[];
	remote: boolean;
	multilocation: Multilocation[];
	way_of_apply: string;
}
  
export interface EmploymentType {
	type: string;
	salary: Salary;
}
  
export interface Salary {
	from: number;
	to: number;
	currency: string;
}
  
export interface Skill {
	name: string;
	level: number;
}
  
export interface Multilocation {
	city: string;
	slug: string;
	street: string;
}
  