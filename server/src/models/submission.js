import mongoose from 'mongoose';
import autoIncrement from 'mongoose-sequence';

const SubmissionSchema = new mongoose.Schema({
  category: {
    type: String,
      required: true
  },
  content: {
    type: String,
    required: true
  },
  contentTitle: {
    type: String,
    required: true
  },
  release: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Release',
    required: true
  },
  rawContentWithoutTitle: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  order: {
    type: Number,
    default: 0,
    required: true
  }

});

SubmissionSchema.plugin(autoIncrement, {inc_field: 'id', id: 'submission_id'});

module.exports = {
  schema: SubmissionSchema,
  model: mongoose.model('Submission', SubmissionSchema)
};
