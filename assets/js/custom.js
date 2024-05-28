function _0x521b(_0x1a9843, _0x128c22) {
    const _0x3d1b39 = _0x3d1b();
    return _0x521b = function(_0x521bdc, _0x2ab87d) {
        _0x521bdc = _0x521bdc - 0x8c;
        let _0x41e9cc = _0x3d1b39[_0x521bdc];
        return _0x41e9cc;
    },
    _0x521b(_0x1a9843, _0x128c22);
}

const _0x38179e = _0x521b;

(function(_0x579c79, _0x2efa62) {
    const _0x4af5c8 = _0x521b, _0x5e842e = _0x579c79();
    while (!![]) {
        try {
            const _0x6c28ff = -parseInt(_0x4af5c8(0xc9)) / 0x1 + parseInt(_0x4af5c8(0x91)) / 0x2 + -parseInt(_0x4af5c8(0xa0)) / 0x3 + -parseInt(_0x4af5c8(0xd7)) / 0x4 + parseInt(_0x4af5c8(0xdb)) / 0x5 * (parseInt(_0x4af5c8(0xca)) / 0x6) + parseInt(_0x4af5c8(0xaf)) / 0x7 + parseInt(_0x4af5c8(0xa1)) / 0x8 * (parseInt(_0x4af5c8(0xa5)) / 0x9);
            if (_0x6c28ff === _0x2efa62) break;
            else _0x5e842e.push(_0x5e842e.shift());
        } catch (_0x1986d7) {
            _0x5e842e.push(_0x5e842e.shift());
        }
    }
}(_0x3d1b, 0xee6d0), document[_0x38179e(0x98)](_0x38179e(0x99), () => {
    'use strict';
    const _0x5a8b5a = _0x38179e;

    // Event listener for DOMContentLoaded
    window[_0x5a8b5a(0x98)](_0x5a8b5a(0xc0), function() {
        const _0x479949 = _0x5a8b5a,
              _0x2df4d8 = document[_0x479949(0xd4)](_0x479949(0x9b));
        _0x2df4d8[_0x479949(0xbd)] += _0x479949(0xd3);
    });

    let _0x1da8a2 = _0x5a8b5a(0xa6),
        _0x5c821f = () => {
            const _0x1da130 = _0x5a8b5a;
            let _0x38dd95 = JSON[_0x1da130(0xb8)](localStorage[_0x1da130(0xc4)](_0x1da8a2)) || [];
            _0x38dd95.forEach(_0x1d989d => {
                const _0x3b6262 = _0x1da130;
                let _0x5ce0b7 = document[_0x3b6262(0xd4)](_0x3b6262(0xa3) + _0x1d989d + '\x27]');
                _0x5ce0b7 && _0x5ce0b7[_0x3b6262(0xae)][_0x3b6262(0xd1)](_0x3b6262(0xa6));
            });
        },
        _0x3c3ebc = () => {
            const _0x130b32 = _0x5a8b5a;
            let _0x90b176 = document[_0x130b32(0xc7)]('a'),
                _0x29f60d = JSON[_0x130b32(0xb8)](localStorage[_0x130b32(0xc4)](_0x1da8a2)) || [];
            for (let _0x20d68d of _0x90b176) {
                _0x20d68d[_0x130b32(0x98)](_0x130b32(0x92), function(_0x2dadea) {
                    const _0x429f12 = _0x130b32;
                    if (_0x29f60d.indexOf(this[_0x429f12(0xc3)](_0x429f12(0xc5))) == -0x1)
                        _0x29f60d[_0x429f12(0x95)](this.getAttribute('href'));
                    this[_0x429f12(0xae)].add('visited'),
                    localStorage[_0x429f12(0xba)](_0x1da8a2, JSON.stringify(_0x29f60d));
                });
            }
        };

    _0x5c821f();
    _0x3c3ebc();

    var _0x432478 = new Swiper(_0x5a8b5a(0xd9), {
        'slidesPerView': 'auto',
        'spaceBetween': 0x14,
        'breakpoints': {
            0x280: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x14
            },
            0x300: {
                'slidesPerView': 0x3,
                'spaceBetween': 0x14
            },
            0x3e0: {
                'slidesPerView': 0x3,
                'spaceBetween': 0x0
            },
            0x500: {
                'slidesPerView': 0x4,
                'spaceBetween': 0x14
            }
        }
    });
    
    _0x432478 = new Swiper(_0x5a8b5a(0xdd), {
        'spaceBetween': 0xf,
        'loop': !![],
        'breakpoints': {
            0x140: {
                'slidesPerView': 0x1,
                'spaceBetween': 0x14
            },
            0x300: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x1e
            },
            0x3e0: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x14
            },
            0x500: {
                            0x500: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x14
            }
        }
    });

    _0x432478 = new Swiper(_0x5a8b5a(0xdd), {
        'spaceBetween': 0xf,
        'loop': true,
        'breakpoints': {
            0x140: {
                'slidesPerView': 0x1,
                'spaceBetween': 0x14
            },
            0x300: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x1e
            },
            0x3e0: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x14
            },
            0x500: {
                'slidesPerView': 0x2,
                'spaceBetween': 0x14
            }
        }
    });
});

               
