class Diary(object):
    def __init__(self, uid, title, date, content, comment='', analysis={}):
        self.uid = uid
        self.title = title
        self.date = date
        self.content = content
        self.comment = comment
        self.analysis = analysis

    @staticmethod
    def from_dict(source):
        return Diary(uid=source.get('uid'), title=source.get('title'), date=source.get('date'),
                     content=source.get('content'), comment=source.get('comment'), analysis=source.get('analysis'))

    def to_dict(self):
        return {'uid': self.uid, 'title': self.title, 'date': self.date,
                'content': self.content, 'comment': self.comment, 'analysis': self.analysis}

    def __repr__(self):
        return f'Diary(uid={self.uid}, title={self.title}, date={self.date}, content={self.content}, ' \
               f'comment={self.comment}, analysis={self.analysis}) '
