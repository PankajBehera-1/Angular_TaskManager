import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  getTeamMembersSummery():any[]
  {
    var TeamMembersSummery = [
      { Rigion: "East", TeamMembersCount: 20, TemporarilyUnavaibleMembers: 4 },
      { Rigion: "West", TeamMembersCount: 15, TemporarilyUnavaibleMembers: 8 },
      { Rigion: "South", TeamMembersCount: 35, TemporarilyUnavaibleMembers: 9 },
      { Rigion: "North", TeamMembersCount: 25, TemporarilyUnavaibleMembers: 2 }
    ];
    return TeamMembersSummery;
  }
}
