import { environment } from '../environments/environment';

export const AUTHENTICATION_HOST: string = environment.authHost;
export const AUTHENTICATION_ENDPOINT: string = "auth";
export const TOKEN_ENDPOINT: string = "/token";

export const IPPON_HOST: string = environment.ipponHost;
export const AUTHORIZATION_ENDPOINT: string = "authorization/";
export const CLUBS_ENDPOINT: string = "clubs/";
export const TOURNAMENTS_ENDPOINT: string = "tournaments/";
export const ADMINS_ENDPOINT: string = "admins/";
export const NON_ADMINS_ENDPOINT: string = "non_admins/";
export const STAFF_ENDPOINT: string = "staff/";
export const PLAYERS_ENDPOINT: string = "players/";
export const PARTICIPANTS_ENDPOINT: string = "participants/";
export const NON_PARTICIPANTS_ENDPOINT: string = "non_participants";
export const PARTICIPATIONS_ENDPOINT: string = "participations/";
export const CLUB_ADMINS_ENDPOINT: string = "club_admins/";
export const TOURNAMENT_ADMINS_ENDPOINT: string = "tournament_admins/";
export const POINTS_ENDPOINT: string = "points/";
export const FIGHTS_ENDPOINT: string = "fights/";
export const TEAMS_ENDPOINT: string = "teams/";