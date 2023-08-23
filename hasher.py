import hashlib


class Hasher:
    def __init__(self):
        pass

    def available_hashers(self):
        return hashlib.algorithms_available

    def gen_hash(self, word, algo, encoding="utf-8", length=20):
        enc_word = word.encode(encoding)

        h = hashlib.new(algo)
        h.update(enc_word)
        
        if algo == "shake_128" or algo == "shake_256":
            hashed_word = h.hexdigest(int(length))
        else:
            hashed_word = h.hexdigest()

        return hashed_word
