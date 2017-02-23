/**
 * Created by lluis on 25/01/2017.
 */

// jscs:disable maximumLineLength

const chalk = require('chalk');

console.log(chalk.magenta('Lets seed this app!'));

module.exports = function (app) {

  // zines fake data
  const faekZines = [
    {
      title: 'First Arya Stark zine pill ever done',
      description: 'In contrast to Sansa, who favors activities befitting a noble and expresses disdain for outdoor activities, Arya shows no interest in dancing, singing, and sewing, and revels in fighting and exploring, much to the chagrin of her mother and tutor Septa Mordane. She is particularly close to her bastard half-brother Jon Snow, who encourages her to learn how to fight and gives her Needle (her small sword).[7] The sword is well suited to Arya\'s slight build and her "Water Dance"-style (fencing) which emphasizes speed and agility with a thin, light rapier used in quick thrusting attacks. Throughout her travels, Arya displays great resourcefulness and cunning, and becomes increasingly ruthless.',
      categorie: 'Stark',
    },
    {
      title: 'Cersei Lannister zine pill',
      description: 'During her teenage years, she hears a prophecy that all of her closest childhood friends will soon die, her children will die during her lifetime, and that she will be thrown out by a younger and more beautiful queen than she. When her friend dies shortly thereafter, she treats this as a confirmation of the truth of the revelation and spends her entire adult life attempting to subvert the prophecy, and eventually develops a strong paranoia over this.',
      categorie: 'Lannister',
    },
    {
      title: 'Meereen zine pill',
      description: 'The largest of the three slaver cities, Meereen has a population equaling that of Astapor and Yunkai combined. The city has architecture similar to that of its neighbors, but it is made of bricks of many colors. Its landscape is dominated by a massive pyramid, named the Great Pyramid, and the Temple of Graces, which is capped by a golden dome. Meereen is unique among the Ghiscari cities in that it is filled with many temples and pyramids. The slavers of Meereen are known as the Great Masters. They field a force of lancers equipped in traditionally extravagant Ghiscari fashion with scales of copper and lances as long as fourteen feet. It is built on the banks of the river Skahadhazan.',
      categorie: 'City',
    },
  ];

  // create zines
  function createZines() {
    app.dataSources.db.automigrate('Zine', function (err) {
      if (err) throw err;

      app.models.Zine.create(faekZines, function (err, records) {
        if (err) {
          return console.log(chalk.red(err.message));
        }

        console.log(chalk.magenta('Done seeding Zines data, ' +
          '' + records.length + ' records created.'));
      });
    });
  }

  // create all models
  createZines();
};
