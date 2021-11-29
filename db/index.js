const Sequelize = require("sequelize");
const { STRING, TEXT } = Sequelize;
const faker = require("faker");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/life_cycle_demo"
);

const User = db.define(
  "user",
  {
    name: {
      type: STRING,
    },
    bio: { type: TEXT },
  },
  {
    hooks: {
      beforeCreate: function (user) {
        //console.log(user);
        if (!user.bio) {
          user.bio = `${faker.lorem.paragraphs(3)}`;
        }
      },
    },
  }
);

User.createWithName = (name) => User.create({ name });

const syncAndSeed = async () => {
  await db.sync({ force: true });
  const [moe, lucy, curly] = await Promise.all(
    ["moe", "lucy", "curly"].map(User.createWithName)
  );
  console.log(lucy.get());
};

module.exports = {
  models: { User },
  syncAndSeed,
};

syncAndSeed();
