import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import NearIT from 'react-native-nearit'

import { Button, Card } from '../commons'
import RatingBar from './ratingBar'

export class FeedbackCard extends Component {
  state = {
    rating: 0,
    comment: ''
  }

  _sendFeedback = async () => {
    const { feedback, onFeedbackSent } = this.props
    const { comment, rating } = this.state
    try {
      await NearIT.sendFeedback(feedback.feedbackId, rating, comment)
      onFeedbackSent && onFeedbackSent(true)
    } catch (err) {
      onFeedbackSent && onFeedbackSent(false)
    }
  }

  render() {
    const { feedback } = this.props
    const { comment, rating } = this.state
    console.log({ feedback })
    return (
      <Card>
        <Text style={styles.feedbackQuestion}>{feedback.feedbackQuestion}</Text>

        <RatingBar
          rating={rating}
          onRating={rating => this.setState({ rating })}
          style={styles.ratingBar}
        />

        {rating > 0 && [
          <Text key="comment-label" style={styles.commentHint}>
            Leave a comment (optional):
          </Text>,

          <TextInput
            key="comment-textarea"
            editable={true}
            multiline={true}
            numberOfLines={4}
            onChangeText={comment => this.setState({ comment })}
            value={comment}
            style={styles.textArea}
          />,

          <Button
            key="comment-send"
            label="Send"
            accessibilityLabel="Send Feedback result"
            onPress={this._sendFeedback}
            style={styles.actionButton}
          />
        ]}
      </Card>
    )
  }
}

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    feedbackId: PropTypes.string,
    feedbackQuestion: PropTypes.string
  }).isRequired,
  onFeedbackSent: PropTypes.func
}

const styles = StyleSheet.create({
  feedbackQuestion: {
    color: 'rgb(51, 51, 51)',
    fontSize: 15
  },
  ratingBar: {
    marginTop: 30,
    marginBottom: 30
  },
  commentHint: {
    color: 'rgb(119, 119, 119)',
    fontSize: 13,
    marginBottom: 10
  },
  textArea: {
    width: 250,
    height: 70,
    borderColor: 'rgb(225, 225, 225)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 2
  },
  actionButton: {
    width: 250,
    height: 45,
    marginTop: 30
  }
})
