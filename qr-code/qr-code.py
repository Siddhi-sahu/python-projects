import qrcode as qr

img= qr.make("https://www.youtube.com/@Fireship")
img.save("fireslop.png")