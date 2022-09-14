
const axios = require('axios');
const atob = require('atob');
const btoa = require('btoa');

const fs = require('fs');

streams = [{"format":"adaptive_dash","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LC51cmxzZXQvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2ODQyNDY1fX19XX0_&Signature=kReipApB2aYaaoSKtpr0uhK4PJ9VW3M52L8z-KA48QqUCizk6IxCtn65an3YsOWubT0lY0NrJ0glO1pp6a2E3UkWhgs-SxhKZrD~wryh0u5UO1j5wDX5D1b9JUZYQJQ6lSQyy2Z7HNuJRzx9oCi726GnzCKSQp-JmQyMYMo7BcXc8L6PmAOppcmWyzV0xc7kbfmzAbnhk0VwxvEel0xpyW4uZUbZsq7yuxG57fgrDVyMg2dvNCLBasfgbzb892Q-7yBAquhiYP8xlmb2O6KQ-jmN2331-o59~qMIyF9oV8N~uxhBVQ~5PHO0BCodMnzIdGn8LjRp8D6EewKz5Hqwog__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"adaptive_hls","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LC51cmxzZXQvbWFzdGVyLm0zdTgiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY4NDI0NjV9fX1dfQ__&Signature=tK2x5JjCbHdpe2nFmkVOffBs~UddPD2B46oS5SqNWskLQowP9kC0~djKTKlDvQetc8yMmQ7Dd2Mo3kXY4TWzyHEUt1mxpYi3SRC~2F0w5cIAyisPm1DdYgNW7ah1rCF~KoP6I~pkwCNaF5rzkT4Bywq1bc5LdvC1WJ-uZ2hagQc7BYosj4fGsTl3g7w2wtVZkC39Q773EQrL4QDY5WemDFZFlQkJKckE6TmscpC6OtrieHApfT~GmCXRYPgV94aMtY6qrTx-K1AQWJ92bD2yizJM7kALpMLD-0lMd-jaAdvcEYALyVVPRrQuUquy-94Rvgjyw0y8yd0lkexzpKv85Q__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"drm_adaptive_dash","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYW5pZmVzdC5tcGQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY4NDI0NjV9fX1dfQ__&Signature=iRVQ3xk4m7xKHbXAX04hTBf6A9D2lDtRFzMOphgfLoxYRER6qN3WE9NPCXG6IVfHRxCmWFZJ5eTCexoEsZB~aIgEeJI4ZAsVW4mUGHQi36yqsGCBWMnNRC44YyAZcEegsnN6frBTmNzli8K5GUE8iBuyVN6yTtiCOoNQDaovzvTlgSAwIA6AO-p0N-nz1~zf8GMgCXVZ3eyMVCAToJixB8Ea0ogISX-4b0caGsBvW6b7EthNa4A16zL1t9UIpMy1XAlPE0aAZUspqZzHsqP6TEZ7bP3aK1aKH1E9tvR8zuR2zqOnqlGwrU8C5f9x~whmaoMbo26tH2m5B3YGd~h6mg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"drm_adaptive_hls","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjg0MjQ2NX19fV19&Signature=Ac96MTl7Ch703zVXoxb~FIv9Ciq6GTV5uoyqCZXbsur2eAEZz4JtnQ-65-LxqeYS3MgSi6-AS6oQ60lSoMi0yryN4HxIBq6Gbg151fRAq-ZB9pua3PveDpAxIJkr3dHWcbGQ3~fGBJz37rdnuvG1eKeUEv6~dsyAVssO7o3GcvphaVScZVjKHiXlBENJqDHkA0Bcm2-j-jm3yMMON6kMP728FhWHAOm26JEiCyt2VhsYgUtKZOaSvNtXRE0oE0gtKw1A0fb6FX3sHFJ6tZJ0oGCvLCN0YyHyI6BzNS6I7lITl6uEx8LQ0D6m2yecOxxUflcHJB6HR5KK6dZUTIymQA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"drm_multitrack_adaptive_hls_v2","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,243319.txt,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9jZmM3ZmIwMTVmZDUwN2QzZmRmYWQ1M2MxMDg0MzcxMy9hc3NldHMvcC84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsMjQzMzE5LnR4dCwudXJsc2V0L21hc3Rlci5tM3U4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2ODQyNDY1fX19XX0_&Signature=mPWW6OgLzvKEUVQ2nOeiuX3l87bQk2I81fyjU0uS~1jurt3J1M5Pdayzg~CBKJ2cFDGedW7np0fBJy3Ye-enkSPKxdapIyeTj3ygkJVJ-fwl6G5tR-cpGglvDUAqfQHwlMF-kM~UHFe-FiVaylrwxJgg41952IDYkNdxX-4Mf8RIJmUSWunMv7ep4Wm0gkQ04r~k8okG14NbnwYRL~V-I4Q4CePNP-Ku0cLKpTJLx91YeMEieTzSSbKH~megJu80lHFQuDUx~8dM0CaEWVMD-48H867WCkirpabHm8fSYnt9K9tgHNsgMdITK0~F~TbmQJggO78q~tfkV7RTbZhoAw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"multitrack_adaptive_hls_v2","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://pl.crunchyroll.com/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,243319.txt,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzMS9kYjRjMjZjZmVlNDQ5YWQ3ZjA4NTk4YzhiYmYyZWFjNC9hc3NldHMvODg0YzM2Mzk1ZDM0NjA2MmU2NjRkMjg1ZWM0YWE2ZWFfLDQwMDM3OTIubXA0LDQwMDM3OTYubXA0LDQwMDM3ODgubXA0LDQwMDM3ODAubXA0LDQwMDM3ODQubXA0LDI0MzMxOS50eHQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjg0MjQ2NX19fV19&Signature=UXs2p7SYHEedDzTFBeE-1zbp~kRvIiPamQaRoNJjLF~3FdVRTCEAfCd9ugr2RJLowZDaWgDtLSxag6R0nPfyKXove8nycmSyp7DYok32rnfeNBC0sXwsAep~V65GLT6NoyPnB3BN7wPFQQjnO9i8jrYxeDEGOltjITvXz2S3Vx5eF5wlGw-bvgWDIV8IWDFAy6eQuOQ9lRnfSjU0SFRMRzR-FTNC1wQDDsLPKmcYZW-Tzjb3-pvbDP47Ek2Ev-TyzRit7a2NYHyBZ4q-oB46ba5jKaKTnvDyWhyxFEoNBhQHqTeAUpxfmiBA5og5dlqJzaXEsyKNwPhWLLEkbal2PA__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"vo_adaptive_dash","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://v.vrv.co/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2RiNGMyNmNmZWU0NDlhZDdmMDg1OThjOGJiZjJlYWM0L2Fzc2V0cy84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYW5pZmVzdC5tcGQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MTY4NDI0NjV9fX1dfQ__&Signature=d0d-ZNvubALDubvRYlg1uO7xLfBVpcW~Wo0cwsqtROomh9VAH559ux~AuiegsaSuh9WOOSzxa0zx7caLjovuBDbsgzcyFfA~QNl2qhud8klbeKvF2JgwgfEndEGllaZOGwvNOb5gEk~8NicKItn7WCmpQD2dTwo6PzmCzAaBSf0g1Vrgb4UTud6mMNkT3CkLURw5ctjPNxSKEQ9nTShp-wtw33KOjN4F3aAUuWDumHU0Fdi84LjPFYpjnDjuVdsKpnK6TJn89M~ANkfXi~L5OMGwJGsHssAGjgckg4z0BXgONUp6RJZWsLPyaUk7x-1xomNxxqwNJnGu5~nGa345yQ__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"vo_adaptive_hls","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://v.vrv.co/evs1/db4c26cfee449ad7f08598c8bbf2eac4/assets/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2RiNGMyNmNmZWU0NDlhZDdmMDg1OThjOGJiZjJlYWM0L2Fzc2V0cy84ODRjMzYzOTVkMzQ2MDYyZTY2NGQyODVlYzRhYTZlYV8sNDAwMzc5Mi5tcDQsNDAwMzc5Ni5tcDQsNDAwMzc4OC5tcDQsNDAwMzc4MC5tcDQsNDAwMzc4NC5tcDQsLnVybHNldC9tYXN0ZXIubTN1OCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjg0MjQ2NX19fV19&Signature=cB~oVHUIAv~sDp3TwjKZ0pTAtl6Pkyx9i2h0co~QSrXmS3GRZkanFyUxP2TfDSvKJcadynUY3Ttt3wL07tEBlxkvOk82K7LbiYCjV8tpLhll7bcm791~esofXIKZs~RNt0ndZmhohqJlx2FYBTaXiQQWL30V~C4PjtobSxXIHKQb-ZHL7gsWRKZBKhd~YasFFU7rnCujjoQlHMmYN5ALuCySFIVlW9Ap6K4avAI2EHTXsmJB3AlwkdPrPBxeDyAGSRCdVwtAvkQABR6dsl5sjdZMEnKPAOhYOVCXDMnf3XcCqHX5GUDjf88RMyhDtxax46RNINQleNTVMCeDJGCfYg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"vo_drm_adaptive_dash","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://v.vrv.co/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2NmYzdmYjAxNWZkNTA3ZDNmZGZhZDUzYzEwODQzNzEzL2Fzc2V0cy9wLzg4NGMzNjM5NWQzNDYwNjJlNjY0ZDI4NWVjNGFhNmVhXyw0MDAzNzkyLm1wNCw0MDAzNzk2Lm1wNCw0MDAzNzg4Lm1wNCw0MDAzNzgwLm1wNCw0MDAzNzg0Lm1wNCwudXJsc2V0L21hbmlmZXN0Lm1wZCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYxNjg0MjQ2NX19fV19&Signature=GDa~vIjfXP8tLHqOOslYWKczsDncx9j5G5RYJq1H4wpXZx2y~ezPWkLA7lU-SHbpVANFSZAVySpm~hX1vzLu9I1j9Z3tGHhcNPIL7YCkblit~lbMoc1qxFmJKiOWGEqDmy9CBREi5QYNiZyz45CmuX9YkgsiL8lS52Ebr8pwfqw4c9i2mY9ORHHvcEVdh8UCecQyUZmCkEbJK29O2SVldaMMHOr2t3zuV3XqxW~x5ipE3KY91NsOomjX3hv2Shc6IzvhCHiJ9G4-NMY64zxcmWlwPhA-5EJcbNCMVrp3g6L~NQZ9ZLHR7YHkQSCBddbUgz2IQH~2QVNKJsd6WB6n-A__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"},{"format":"vo_drm_adaptive_hls","audio_lang":"jaJP","hardsub_lang":"ptBR","url":"https://v.vrv.co/evs1/cfc7fb015fd507d3fdfad53c10843713/assets/p/884c36395d346062e664d285ec4aa6ea_,4003792.mp4,4003796.mp4,4003788.mp4,4003780.mp4,4003784.mp4,.urlset/master.m3u8?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly92LnZydi5jby9ldnMxL2NmYzdmYjAxNWZkNTA3ZDNmZGZhZDUzYzEwODQzNzEzL2Fzc2V0cy9wLzg4NGMzNjM5NWQzNDYwNjJlNjY0ZDI4NWVjNGFhNmVhXyw0MDAzNzkyLm1wNCw0MDAzNzk2Lm1wNCw0MDAzNzg4Lm1wNCw0MDAzNzgwLm1wNCw0MDAzNzg0Lm1wNCwudXJsc2V0L21hc3Rlci5tM3U4IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2ODQyNDY1fX19XX0_&Signature=hRUjc3hhujXzfky4XQfSo8Fa~JbiQzLgP2tr54sxv3F~iWCU3~DofEqB2nN8gtrq9JVt806ezMWjaHChLKKAge9boywKBE8zSplQDhlE5DvhcczCqSQQ9mddxV8D75qx8Y5J~~QkZsUwfSrXzSQa~pr1C1y4FHHXt3AZMSGqn6mXvZQDBReMzj8JYSeyOrpwYMkGay72F--wo3CgHMJyNwO2Lq5acjRJ539i9HwGqd~ZCwLv5WJpoXfDGo~F2BtHDkJKtKmrcvXz2u0D7zV3ELCXvv3yhu2lkJWAxfG3ublOiTlBGwwJtOuamJXXaZJroRqApYdJNEyRQUNFqByxBw__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA","resolution":"adaptive"}]

for (let s of streams)
    if (s.format !== 'erm_adaptive_dash$$$$$$') {
        let manifest = s.url
            .replace("v.vrv.co", "dl.v.vrv.co")
            .replace("pl.crunchyroll.com", "dl.v.vrv.co")
            .replace("dl.v.vrv.co", "v.vrv.co")
            .replace("master.m3u8", "manifest.mpd")
            .replace("evs1", "evs")
            .replace('assets/8', 'assets/p/8')
        manifest = remakeUrl(s.url)
            .replace("master.m3u8", "manifest.mpd")
        mafinest = s.url
            .replace("v.vrv.co", "dl.v.vrv.co")
            .replace("master.m3u8", "manifest.mpd")
            .replace("evs1", "evs")

    }
lookup('https://pl.crunchyroll.com/evs/6b243432d3d162b08e3e3c256910a358/assets/6b243432d3d162b08e3e3c256910a358_4015612.mp4/clipFrom/0000/clipTo/120000/manifest.mpd?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9wbC5jcnVuY2h5cm9sbC5jb20vZXZzLzZiMjQzNDMyZDNkMTYyYjA4ZTNlM2MyNTY5MTBhMzU4L2Fzc2V0cy82YjI0MzQzMmQzZDE2MmIwOGUzZTNjMjU2OTEwYTM1OF80MDE1NjEyLm1wNC9jbGlwRnJvbS8wMDAwL2NsaXBUby8xMjAwMDAvbWFuaWZlc3QubXBkIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjE2OTQ3MDU0fX19XX0_&Signature=WkqyfbEuAxDdnD4cKSf8xRZV2gDXmgmbitdauqz8l6QdXrt3Aq9GOohJbIqhRltJa~VSy~wmKwlmheJNSdy8HBais0wMOl~dOWHX3QqbhouU2Liet9RB0V7bhN-0VbyBDY06Cx1f22gbalf9GWsA1lDqvA419SvPLr8NQXqB45YujNbnrNKRtkQYJjvuwW-uJbPdvdTgQUtxm3EqBvzIRKK9ij6dClf20AOgBMXNAEk0YL-mOegp6t9btQBMe~KRc~lN3u-JoZ~0ghYvkM3U-tc2b0xf5RHUE7hq-GvAHJX6j8HHYAdSqOcl4cjCCP8xU5bKZP-X9n4EzrmUyvEvsg__&Key-Pair-Id=APKAJMWSQ5S7ZB3MF5VA');
        

works = [1, 3, 8, 9];
works = [1, 6, 7, 8]

const r = { 0: '720p', 1: '1080p', 2: '480p', 3: '360p', 4: '240p' };

let curfs = 0;
function lookup(current_url) {
    video_dash_playlist_url_old = current_url
    video_dash_playlist_url = current_url

    axios.get(video_dash_playlist_url_old).then(result => {
        const data = result.data;
        fs.writeFileSync('./fs' + (curfs++) + '.xml', data)

        const auth = pegaString(data, '\\.(?:mp4|m4s)\\?', '"', 0);
        let params_download_link = htmlDecode('?'+auth);
        params_download_link = params_download_link.replace(/&t=.*$/, '');
        params_download_link = params_download_link.replace(/(&|\?)Expires=\d+&/, '$1')
        if (!params_download_link) return;

        function linkDownload(id) {
            let video_code = video_dash_playlist_url.split(",")[id+2];
            let video_mp4_url = video_dash_playlist_url.split(/_(?:,|\*)/)[0] + "_" + video_code + params_download_link;
            let links = [];

            video_mp4_url = fixPolicy(video_mp4_url, '1769000').replace('120000', '1769000')

            links.push(video_mp4_url);
            links.push(normalize(video_mp4_url));
            links.push(useEvs1(video_mp4_url, true));
            links.push(useEvs1(video_mp4_url, false));
            links.push(useEvs1(normalize(video_mp4_url), true));
            links.push(useEvs1(normalize(video_mp4_url), false));
            links.push(useP(video_mp4_url, false));
            links.push(useP(normalize(video_mp4_url), false));
            links.push(useP(useEvs1(video_mp4_url, true), false));
            links.push(useP(useEvs1(video_mp4_url, false), false));
            links.push(useP(useEvs1(normalize(video_mp4_url), true), false));
            links.push(useP(useEvs1(normalize(video_mp4_url), false), false));
            links.push(useP(video_mp4_url, true));
            links.push(useP(normalize(video_mp4_url), true));
            links.push(useP(useEvs1(video_mp4_url, true), true));
            links.push(useP(useEvs1(video_mp4_url, false), true));
            links.push(useP(useEvs1(normalize(video_mp4_url), true), true));
            links.push(useP(useEvs1(normalize(video_mp4_url), false), true));

            links.push(video_mp4_url);
            links.push(useP(useEvs1(normalize(video_mp4_url), true), false));
            links.push(useP(useEvs1(video_mp4_url, true), false));
            links.push(remakeUrl(video_mp4_url))

            if (!isValid(video_mp4_url) && false) {
                console.log('---------------- BAD POLICY ----------------')
                console.log('url:   ', getClean(video_mp4_url))
                console.log('policy:', getPolicy(video_mp4_url))
                console.log('p:     ', getPolicy(video_mp4_url, 4) === getClean(video_mp4_url, 4))
                return;
            }

            let i = 0;
            for (link of links) {
                const staticlink = link.replace('http*', 'https')
                setTimeout(() => {
                    setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'v.vrv.co')), 0)
                    setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'pl.crunchyroll.com')), 500)
                    setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'dl.v.vrv.co')), 1000)
                    setTimeout(() => search(video_dash_playlist_url, staticlink.replace(/(?:v\.vrv\.co|pl\.crunchyroll\.com)/, 'a-vrv.akamaized.net')), 1500)
                }, i * 2000);
                i++;
            }
        }
    
        linkDownload(1);
    }).catch(err => {
        console.log('---------------- EXCEPTION ----------------')
        console.log('isValid:', isValid(video_dash_playlist_url_old))
        console.log('url:    ', video_dash_playlist_url_old)
        console.log('throws: ', err)
    });
}

function search(manifest, video) {
    axios.get(video).then(r => {
        console.log('-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-! FOUND !-!-!-!-!-!-!-!-!-!-!-!-!-!-!-!-')
        console.log(video)
    }).catch(err => {
        console.log('---------------- NOT FOUND ----------------')
        console.log('playlist:', getClean(manifest))
        console.log('to:      ', getClean(video))
        console.log('code:    ', err.response?.status ?? 0)
    })
}

function isManifest(url) {
    return url.includes('manifest.mpd');
}

function useP(url, condition) {
    if (condition) return url.replace('/assets/p/', '/assets/')
    else return url.replace('/p/', '/')
}

function useEvs1(url, condition) {
    if (condition) return url.replace('/evs/', '/evs1/')
    else return url.replace('/evs1/', '/evs/')
}

function normalize(url) {
    return url.replace(getClean(url, 4), getPolicy(url, 4));
}

function isValid(url) {
    try { 
        const policystr = getPolicy(url).slice(0, -1);
        return getClean(url).startsWith(policystr);
    } catch (err) {
        return false;
    }
}

function getClean(url, slashPos) {
    const resource = pegaString(url, '^', '\\?')
    if (slashPos)
        return resource.split('/')[slashPos];
    return resource;
}

function getPolicy(url, slashPos) {
    const str = atob(pegaString(url, 'Policy=', '_*&')).replace('http*', 'https').trim();
    const stt = JSON.parse(str)
    const resource = stt.Statement[0].Resource
    if (slashPos)
        return resource.split('/')[slashPos];
    return resource;
}

function fixPolicy(url, toClip) {
    const policy = pegaString(url, 'Policy=', '_*&');
    const str = atob(policy).replace('/120000/', '/'+toClip+'/').trim();
    const newPolicy = 'Policy=' + btoa(str).replaceAll('=','_') + '&';
    return url.replace(policy, newPolicy);
}

function remakeUrl(url) {
    const policy = getPolicy(url);
    return policy + '?' + url.replace(/^.*\?/, '')
}

function htmlDecode(input) {
    const decoded = input.replaceAll('&amp;', '&');
    return decoded;
}

function pegaString(str, first_character, last_character, pos = 0) {
    if (str.match(first_character + "(.*?)" + last_character) == null) {
        return '';
    } else {
        matches = str.matchAll(first_character + "(.*?)" + last_character);
        while (pos --> 0)
            matches.next()
        new_str = matches.next().value[1].trim()
        return (new_str)
    }
}

function getPolicy(url, slashPos) {
    const token = pegaString(url, 'Policy=', '_*&');
    console.log(token)
    const str = atob(token).trim();
    const stt = JSON.parse(str)
    const resource = stt.Statement[0].Resource
    if (slashPos)
        return resource.split('/')[slashPos];
    return resource;
}
