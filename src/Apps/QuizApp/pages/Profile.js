import { Button, Chip, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { badges } from '../Icons_Images/Icons'
import Modal from '@mui/material/Modal';
import BadgesDetailTable from '../components/ProfileComponents/BadgesDetailTable';


const BadgesToolTipBox = () => {
  const { quizes } = useSelector(state => state.quizes)
  const { user } = useSelector(state => state.user)
  return (
    <div>
      <p className='underline mb-3'>Bades overview</p>
      <div className='flex gap-2'>
        <div className='flex flex-col justify-center'>
          <span>Quiz</span>
          {
            user?.badges?.map(badge => {
              return <span key={badge._id}>{quizes?.filter(q => q._id === badge.quiz)[0].techs.join(" + ") + " :"}</span>
            })
          }
        </div>
        <div className='flex flex-col justify-center items-center'>
          <span>Badge</span>
          {
            user?.badges?.map(badge => {
              return <span key={badge._id}>{badge.badge}</span>
            })
          }
        </div>
      </div>
    </div>
  )
}

const TotalQuizesAttmpToolTipBox = () => {
  const { quizes } = useSelector(state => state.quizes)
  const { user } = useSelector(state => state.user)
  return (
    <>
      <ul>
        {
          user?.score.map(s => {
            return (
              <li className='!list-disc'>{quizes.filter(q => q._id === s.quiz)[0].techs.join(" + ")}</li>
            )
          })
        }
      </ul>
    </>
  )
}

const Profile = () => {

  const { user } = useSelector(state => state.user)
  const [seeMore, setSeeMore] = useState(false)
  const getTrimText = (text) => {
    if (seeMore) return text
    else return text.slice(0, 221)
  }
  let text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore dolores, recusandae quo officiis esse aut quod delectus soluta fugit modi quam eius mollitia atque molestias, odit corporis? Consectetur, quaerat magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ullam sint facere dicta, doloribus natus eveniet tempore corporis aliquam ducimus mollitia doloremque deserunt fugiat, illo hic labore sed expedita recusandae sunt sapiente suscipit tempora illum? Doloremque nihil vitae ratione, cupiditate quia maiores laborum sunt explicabo labore eum totam praesentium dolorem. Praesentium, atque autem? Perferendis eligendi voluptatibus, nam quae ipsa tempore atque beatae quam ex eveniet officiis nemo, animi ea excepturi autem voluptatum facere cum reiciendis hic recusandae molestias. Nam totam, fugit iste, neque nihil eum possimus in repellat nemo ratione dolore recusandae ex excepturi nesciunt distinctio at architecto consequuntur itaque."

  const socialIconsColor = {
    facebook: "#1877F2",
    linkedin: "#0A66C2",
    twitter: "#1DA1F2",
    instagram: "#E4405F",
    reddit: "#FF5700",
    pinterest: "#BD081C",
    youtube: "#CD201F"

  }

  const BadgeCount = ({ badge }) => {

    const getBadgesCount = (badge) => {
      return user?.badges?.filter(b => b.badge === badge).length
    }
    return <span className='mt-4 flex text-lg md:text-xl rounded-full h-8 md:h-9 justify-center items-center bg-gray-200 font-bold text-gray-600 noto'>
      {getBadgesCount(badge)}
    </span>

  }

  const Badgedata = ({ badge }) => {
    return <div className="badge">
      <img src={badges[badge]} alt="" className='w-24 md:w-28' />
      <span className='text-sm medium inline-block mt-1'>( {badge} )</span>
      <BadgeCount badge={badge} />
    </div>
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='f-roboto mt-10 flex gap-2 items-center justify-center mb-10 w-fit md:w-full mx-3 md:mx-0 flex-col'>
      <div className="w-full md:max-w-[98%] lg:w-[1200px]  flex-col lg:flex-row bg-white flex px-5 md:px-10 py-5 gap-10 h-fit items-center">
        <div className='flex items-center flex-col'>
          <div className='w-64 h-64 rounded-full overflow-hidden'>
            <img className='h-full w-full object-cover' src={user?.avatar} alt="avatar" />
          </div>
          <div className='my-5'>
            <p className='text-2xl bold mt-1 text-gray-600'>{user?.name}</p>
            <p className='bold text-gray-400 text-sm '><i className="fa-solid fa-envelope mr-1"></i>{user?.email}</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col gap-2 justify-start items-start '>
            <p>Your Tech Interests</p>
            <div className='flex gap-2 items-center mb-5'>
              {
                user?.techInt.map((item, i) => {
                  return <Chip key={i} label={item} variant="outlined" size='small' />
                })
              }
            </div>
          </div>
          <div className='text-left text-sm mb-6 mt-2'>
            {
              getTrimText(text)
            }
            {
              text.length > 221 && <span onClick={() => setSeeMore(!seeMore)} className='text-blue-500 cursor-pointer text-sm'>{!seeMore ? "see more" : "see less"}</span>
            }
          </div>
          <div className='flex flex-col md:flex-row gap-4 items-start text-sm'>
            <div>
              Total Quizes attempted:
              <Tooltip title={<TotalQuizesAttmpToolTipBox />} placement='top' className='ml-1'>
                <span className='min-w-[50px] bg-slate-200 rounded-md px-4 cursor-default noto'>{user?.score.length ? user?.score.length : 0}</span>
              </Tooltip>
            </div>
            <div>
              Total badges Earn:
              <Tooltip title={<BadgesToolTipBox />} placement='top' className='ml-1'>
                <span className='min-w-[50px] bg-slate-200 rounded-md px-4 cursor-default noto'>{user?.badges.length}</span>
              </Tooltip>
            </div>
            <div>
              Total Score:
              <span className='min-w-[50px] bg-slate-200 rounded-md px-4 cursor-default noto ml-1'>
                {user?.score.length ? user?.score.reduce((accum, s) => {
                  accum += s.score
                  return accum
                }, 0) : 0}
              </span>
            </div>
          </div>
          <div className='flex items-center gap-3 mt-5 text-3xl'>
            {
              Object.keys(socialIconsColor).map(k => {
                return (
                  // <i class={`fa-brands ${k === "linkedin" ? "" : ""} `}></i>
                  <></>
                )
              })
            }
          </div>
          <div className='flex gap-4 justify-end mt-8 flex-col md:flex-row'>
            <Button className='!bg-gray-100 !px-10 hover:!bg-gray-200 md:w-fit !text-[.85rem]'>Change password</Button>
            <Button className='!bg-gray-100 !px-10 hover:!bg-gray-200 md:w-fit !text-[.85rem]'>Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className='w-full md:max-w-[98%] lg:w-[1200px] flex gap-5 mt-3 flex-col lg:flex-row'>
        <div className='w-full lg:w-[50%] min-h-[300px] bg-white px-0 py-4'>
          <div className='flex justify-between'>
            <h2 className='text-left text-md px-3 py-1 bg-gray-100 w-fit font-medium text-gray-600'>
              Badges Earn: <span className='noto'>{user?.badges.length}</span>
            </h2>
            <h2 className='text-left text-md px-3 py-1 bg-gray-100 w-fit font-medium text-gray-600'>
              Quizes Attempted: <span className='noto'>{user?.score.length}</span>
            </h2>
          </div>
          <div className='flex justify-around mt-10 flex-wrap'>
            <Badgedata badge={"gold"} />
            <Badgedata badge={"silver"} />
            <Badgedata badge={"bronze"} />
          </div>

          <>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <BadgesDetailTable />
            </Modal>

          </>

          {
            user?.badges.length > 0
            &&
            <Button onClick={handleOpen} className='!bg-gray-100 !px-10 hover:!bg-gray-200 md:w-fit !text-[.85rem] !mt-7'>View detail table</Button>
          }
        </div>
        <div className='w-full lg:w-[50%] min-h-[300px] bg-white'>
        </div>
      </div>
    </div>


  )
}

export default Profile
