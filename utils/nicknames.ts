export const NICKNAMES = [   
    'ECHO',     
    'SAGE',    
    'SKY',       
    'WAVE',      
    'DUSK',     
    'DAWN',    
    'MIST',     
    'SNOW',     
    'RAIN',        
    'ASH',      
    'STAR',         
    'LEAF',      
    'ZEN',      
    'AURA',      
    'REEF',     
    'VALE', 
    'MOON',     
    'PINE',    
    'EAST',     
    'PEAK',                         
] as const;

export type Nickname = typeof NICKNAMES[number];
