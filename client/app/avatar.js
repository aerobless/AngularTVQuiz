"use strict";
var Avatar = (function () {
    function Avatar() {
    }
    Avatar.getRandom = function () {
        return exports.AVATARS[Math.floor(Math.random() * exports.AVATARS.length)];
    };
    Avatar.getAvatar = function (requestedAvatar) {
        for (var i = 0; i < exports.AVATARS.length; i++) {
            if (exports.AVATARS[i].name == requestedAvatar) {
                return exports.AVATARS[i];
            }
        }
    };
    return Avatar;
}());
exports.Avatar = Avatar;
exports.AVATARS = [
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
