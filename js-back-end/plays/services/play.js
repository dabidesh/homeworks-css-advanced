// Сървис, където ще са действията със съотв. модел
// Няма валидации и коригирания ...
// Идеята е сървиса да е глупав – каквото му кажем, това прави

const Play = require('../models/Play');
//const { isUser, isGuest } = require('../middlewares/guards');

const getAllPlays = async (orderBy) => {
  let sort = '-createdAt';
  if (orderBy == 'likes') {
    console.log('Sorting by likes ...');
    sort = { usersLiked: 'desc' };
  }
  // Ако се напише await се тая, винаги връща промис
  return Play.find({})
    .sort(sort)
    .lean();  //връща всички, lean – за да ги подадем на шаблона, премахва функционалността, която mongoose е добавила (гетъри, сетъри), идеята е да върнем вю-модела
  //sort {createdAt: -1}
};

const getAllPublicPlays = async (orderBy) => {
  let sort = '-createdAt';
  if (orderBy == 'likes') {
    console.log('Sorting by likes public...');
    sort = { usersLiked: 'desc' };
  }
  // Ако се напише await се тая, винаги връща промис
  return Play.find({ public: true })
    .sort(sort)
    .lean();  //връща всички, lean – за да ги подадем на шаблона, премахва функционалността, която mongoose е добавила (гетъри, сетъри), идеята е да върнем вю-модела
  //sort {createdAt: -1}
};

// let regex = new RegExp(value.searchQuery, 'i');
// { $and: [{ $or: [{ title: regex }, { description: regex }] }, { category: value.category }, { city: value.city }] }

/* Search by 1 field
  return Play
  .find({
    title: new RegExp(query.search, 'i')
  })
  .lean(); */

const getPlaysBySearch = async (query, user) => {
  const search = query.search.trim();
  const regex = new RegExp(search, 'i');
  if (user) {
    return Play
      .find({
        $and: [{ $or: [{ title: regex }, { description: regex }] }]
      })
      .lean();
  } else {
    return Play
      .find({
        $and: [{ $or: [{ title: regex }, { description: regex }] }],
        public: true,
      })
      .lean();
  }
};

//.populate('usersLiked') и без и с туй рàботи!
const getPlayById = async (id) => {
  return Play.findById(id).lean();
};

const createPlay = async (playData) => {

  // unique не е валидатор, можем да си направим индекс ...
  // Обаче регистъра е проблема
  const pattern = new RegExp(`^${playData.title}$`, 'i');
  // беше find, връща масив
  const existing = await Play.findOne({ title: { $regex: pattern } });
  if (existing) {
    throw new Error('A play with this title already exist!');
  }

  const play = new Play(playData);

  await play.save();

  return play;
};

// На ниво мидълеър, където имаме достъп до рекуеста, трябва да извадим id-то на автора ...

const editPlay = async (id, playData) => {
  //findOneAndUpdate, но заобикаля валидациите ...
  // Значи пак трябва да дръпнем play

  // lean ще ни счупи логиката, защото искаме play да е истински модел
  const play = await Play.findById(id);

  play.title = playData.title.trim();
  play.description = playData.description.trim();
  play.imageUrl = playData.imageUrl.trim();
  // Без Boolean беше CastError (синктатична грешка) и нямаше properties
  // А валидационната е TypeError и си има
  play.public = Boolean(playData.public);
  // Другите полета са служебни

  return play.save();
};

const deletePlay = async (id) => {
  return Play.findByIdAndDelete(id);
};

// Връзката от потр. към пиесата е безпредметна в конкр. задание
// Виктор: това мое мнение е субективно!
const likePlay = async (id, userId) => {
  const play = await Play.findById(id);

  play.usersLiked.push(userId);

  // return за да върне промиса и да го await-не от другата страна
  return play.save();
};

module.exports = {
  getAllPlays,
  getAllPublicPlays,
  getPlayById,
  createPlay,
  editPlay,
  deletePlay,
  likePlay,
  getPlaysBySearch,
};