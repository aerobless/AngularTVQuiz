export class Avatar {
    name:string;
    description:string;
    thumbnail:string;
    
    static getRandom(){
        return AVATARS[Math.floor(Math.random()*AVATARS.length)];
    }
    
    static getAvatar(requestedAvatar:String){
        for(let i=0; i<AVATARS.length; i++){
            if(AVATARS[i].name == requestedAvatar){
                return AVATARS[i];
            }
        }
    }
}

export const AVATARS:Avatar[] = [
    {
        name: 'Dog',
        description: '',
        thumbnail: 'dog.png'   
    },
    {
        name: 'Ape',
        description: '',
        thumbnail: 'ape.png'
    },
    {
        name: 'Cat',
        description: '',
        thumbnail: 'cat.png'
    },
    {
        name: 'Chicken',
        description: '',
        thumbnail: 'chicken.png'
    },
    {
        name: 'Cow',
        description: '',
        thumbnail: 'cow.png'
    },
    {
        name: 'Elk',
        description: '',
        thumbnail: 'elk.png'
    },
    {
        name: 'Fox',
        description: '',
        thumbnail: 'fox.png'
    },
    {
        name: 'Panda',
        description: '',
        thumbnail: 'panda.png'
    },
    {
        name: 'Pig',
        description: '',
        thumbnail: 'pig.png'
    }
];