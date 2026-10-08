type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

// 초록 큰 버튼. <Button onClick={...}>시작하기</Button>
export default function Button({ className = '', ...rest }: Props) {
  return <button className={'b-btn ' + className} {...rest} />
}