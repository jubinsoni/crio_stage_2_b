from django.db import models
from PIL import Image, ImageDraw, ImageFont
from django.core.files.base import ContentFile
import requests
import os
from io import BytesIO
import textwrap
from django.conf import settings
from django.utils import timezone

extra_width = settings.EXTRA_WIDTH
caption_height = settings.CAPTION_HEIGHT
font_size = settings.FONT_SIZE
crop_size = settings.CROP_SIZE
date_format = settings.DATE_FORMAT

class MemeFeedback(models.Model):

    name = models.CharField(max_length=250)
    caption = models.CharField(max_length=250)
    image_url = models.URLField(max_length = 200)
    date = models.DateTimeField(default=timezone.now)
    image_file = models.ImageField(upload_to='feedback_pics',blank=True,default=None)

    def save(self, *args, **kwargs):
        self.date = timezone.now()
        filename, file_extension = os.path.splitext(self.image_url)
        # print("file_extension => ",file_extension)
        if file_extension in ['.png','jpg']:
            img = Image.open(requests.get(self.image_url, stream=True).raw)
            
            # Image processing
            #if(img.height > crop_size or img.width > crop_size):
            output_size = (crop_size, crop_size)
            img.thumbnail(output_size)
            width, height = img.size
            # bi = Image.new('RGBA', (width + 2 * extra_width, height + caption_height), 'white')
            # bi.paste(img, (extra_width, caption_height - extra_width))
            # font = ImageFont.truetype("Keyboard.ttf", font_size)
            # draw = ImageDraw.Draw(bi)
            # draw.text((extra_width, extra_width), self.name, font=font, fill="black", stroke_width=0)
            # print("self.date => ",self.date)
            # draw.text((int(crop_size / 2), extra_width), self.date.strftime(date_format), font=font, fill="black", stroke_width=0)
            # itr = 1
            # lines = textwrap.wrap(self.caption, width=40)
            # for line in lines:
            #     draw.text((extra_width, (3 * extra_width) * itr), line, font=font, fill="black", stroke_width=0)
            #     itr = itr + 1
            
            #deleting old file for patch method
            if bool(self.image_file):
                #print("self.image_file => ",self.image_file.path)
                os.remove(self.image_file.path)

            # saving file to backend 
            f = BytesIO()
            #bi.save(f,format=file_extension[1:])
            img.save(f,format=file_extension[1:])
            s = f.getvalue()
            f.close()
            self.image_file.save(os.path.basename(self.image_url),ContentFile(s),save=False)
        else:
            print("raise error")
        
        super(MemeFeedback, self).save(*args, **kwargs)