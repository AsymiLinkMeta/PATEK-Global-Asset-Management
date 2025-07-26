import React from 'react';
import { TeamMember as TeamMemberType } from '../types';

interface TeamMemberProps {
  member: TeamMemberType;
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="bg-light-50 overflow-hidden group shadow-lg">
      <div className="relative overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-80 object-cover filter contrast-[0.9] brightness-[0.95] saturate-[0.85]"
          style={{
            WebkitFilter: 'contrast(0.9) brightness(0.95) saturate(0.85)',
            backdropFilter: 'contrast(0.9) brightness(0.95) saturate(0.85)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent opacity-40"></div>
      </div>
      <div className="p-6 prestige-gradient text-center">
        <h3 className="text-xl font-display font-semibold text-dark-900 tracking-wide text-center">{member.name}</h3>
        <div className="w-12 h-0.5 bg-bronze-400 my-2 mx-auto"></div>
        <p className="text-bronze-500 mb-4 tracking-wide text-center">{member.position}</p>
        <p className="text-dark-800 elegant-spacing text-center">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamMember;