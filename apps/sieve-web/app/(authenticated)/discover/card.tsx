import { CardProps } from '@/sieve-web/types/types';
import {
  easeIn,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SwipeButton from './navButton';
import { Spinner, Textarea } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

const Card = ({ data, active, removeCard }: CardProps) => {

  const session = useSession();
  
  const [exitX, setExitX] = useState(0);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const [tracksInfo, setTracksInfo] = useState<{
                                        name: string;
                                        artists: string[];
                                        image: string;
                                      }[]>() 

  useEffect(() => {
    if (data.topTracksId && session.data?.accessToken) {
      if (data.topTracksId.length !== tracksInfo?.length) {
        const getTrackData = async (trackIds: string): 
          Promise<{
            tracks: {
              name: string;
              artists: Array<{name: string}>, 
              album:{
                images: Array<{url: string}>
              }
            }[]
          }> => {
          const res = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${trackIds}`, { 
                headers: {
                    'Authorization': `Bearer ${session.data?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                cache: 'force-cache' 
            })
          
          return await res.json();
        }

      const fetchTracksData = async () => {
        try {
          const tracksInfo = await getTrackData(data.topTracksId.join(','));
          const tracksDataList = tracksInfo.tracks.map((track) => ({
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[0].url,
          }));
          return tracksDataList;
        } catch (error) {
          console.error('Error fetching tracks data:', error);
        }
      };
      
      fetchTracksData().then(data => 
        setTracksInfo(data)
      ) 
    }}
  }, [data.topTracksId, tracksInfo?.length, session.data?.accessToken])

  const dragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      setExitX(200);
      removeCard(data.id, 'accept');
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data.id, 'reject');
    }
  };

  const touchStart = (e: TouchEvent) => {
    // prevent default to disable default browser touch gestures
    e.preventDefault();
  };

  return (
    <>
      <SwipeButton exit={setExitX} removeCard={removeCard} id={data.id} />
      {active ? (
        <motion.div
          ref={cardRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="card top-6 bg-[#D48F9F]/80 shadow-lg shadow-[#382A40] absolute z-30 flex min-h-[500px] w-11/12 xs:w-[373px] items-center justify-center self-center text-2xl font-body"
          onDragEnd={dragEnd}
          onPanStart={(e: any)=>touchStart(e)}
          initial={{ scale: 0.95, opacity: 0.5 }}
          animate={{
            scale: 1.05,
            opacity: 1,
          }}
          style={{ x, rotate, opacity, touchAction: "none"}}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
          whileDrag={{ cursor: 'grabbing' }}
          exit={{ x: exitX }}
        >
          <div className="scrollCards absolute m-auto h-[calc(100%-20px)] w-[calc(100%-20px)] overflow-y-scroll rounded-[20px] border-2 border-white">
            <div className="relative min-h-[360px] w-full overflow-hidden rounded-b-xl">
              <Image
                src={data.profilePicture}
                fill
                alt={data.name}
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="mt-6 flex items-center justify-between px-4 font-head text-2xl font-medium text-white">
              <p>{data.name}</p>
              <p>{data.age}</p>
              <p>{data.gender.toLowerCase()}</p>
            </div>
            <p className="mt-3 px-4 font-head text-lg font-medium text-white">
              {data.personalityType.toLowerCase()}
            </p>
            <div className="mt-3 flex gap-1 px-4 text-base">
              {data.topGenres.map((item, idx) => (
                <p key={`${item}${idx}`} className="rounded-[7px] bg-[#A20F0F] px-4 py-2">
                  {item}
                </p>
              ))}
            </div>
            <Textarea
              label="Top artists"
              isDisabled
              className='mt-5 px-2 font-body'
              value={data.topArtists.join(', ')}
            />
            <p className="mt-5 px-4 text-xl font-body font-medium">Top tracks</p>
            <div className="mt-3 mb-4 grid grid-cols-2 gap-4 px-4">
              {
              tracksInfo ? 
              tracksInfo?.map((track, idx) => {
                return (
                  <div key={`${track.name}${idx}`}>
                    <Image
                      src={track.image}
                      width={150}
                      height={150}
                      alt=""
                      className="rounded-lg"
                    />
                    <p className="mt-2 ml-1 text-sm font-medium">
                      {track.name}
                    </p>
                    <p className="ml-1 text-xs font-normal text-[#a20f0f]">
                      {track.artists.join(', ')}
                    </p>
                  </div>
                );
              }) : 
              <div className="flex flex-col gap-1 items-center justify-center w-full">
                <Spinner />
              </div>
            }
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default Card;