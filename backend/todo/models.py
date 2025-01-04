from django.db import models


# 今後はcheckedしたらstatusを変更して自動で動かせたい
class Todo(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    checked = models.BooleanField(default=False) # 作成したtodoが完了したかどうか
    description = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name


# 今後追加するModel
#   Loginしたら他人の投稿も見れてlikeやcommentを出来るようにする
#   Loginしなかったら自分の投稿のみ管理できる
# User, Profile, Comment, Bookmark 
