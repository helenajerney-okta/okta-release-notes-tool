import { model as Release } from '../models/release';
import { model as Submission } from '../models/submission';
import { processRes } from '../utils';

const releasesRoutes = (router) => {
  router.route('/releases')
    .post((req, res) => {
      const rel = new Release();
      rel.name = req.body.name;
      rel.type = req.body.type;
      rel.previewBeginDate = req.body.previewBeginDate;
      rel.prodBeginDate = req.body.prodBeginDate;

      rel.save((err, release) => {
        if (err) {
          if (err.name === "ValidationError") {
            res.status(400)
          } else {
            res.status(500);
          }
          res.send(err);
        } else {
          res.json(release);
        }
      });
    })
    .put((req, res) => {
      // const subId = JSON.parse(req.body.subId);
      // Submission.findOneAndUpdate({ id: subId }, {
      //   category: req.body.category,
      //   authorName: req.body.authorName,
      //   content: req.body.content,
      //   rawContentWithoutTitle: req.body.rawContentWithoutTitle,
      //   contentTitle: req.body.contentTitle
      // }, { new: true }, (err, submission) => {
      //   if (err) {
      //     if (err.name === "ValidationError") {
      //       res.status(400)
      //     } else {
      //       res.status(500);
      //     }
      //     res.send(err);
      //   } else {
      //     res.json(submission);
      //   }
      // });
    })
    .get((req, res) => {
      Release.find().then((releases) => {
        processRes(res, releases);
      }).catch((err) => {
        if (err) {
          res.send(err);
        }
      })
    });

  router.route('/releases/:relId')
    .get((req, res) => {
      Release.where({ id: req.params.relId }).findOne((err, rel) => {
        processRes(res, err, rel);
      });
    });

  router.route('/releases/:relId/submissions')
    .get((req, res) => {
      Release.where({ id: req.params.relId }).findOne()
        .then((rel) => {
          Submission.where({ release: rel._id }).find()
            .then((subs) => {
              processRes(res, subs);
            });
        })
        .catch((err) => {
          if (err) {
            res.send(err);
          }
        });
    });
}

export default releasesRoutes;
