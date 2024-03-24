import CreateDoItYourselfTextarea, {
  CommentProps,
} from '../createDoItYourselfCommonTextarea/CreateDoItYourselfTextarea';

export default function CreateDoItYourselfComment(commentProp: CommentProps) {
  return (
    <CreateDoItYourselfTextarea
      title="댓글"
      content="댓글을 작성해 주세요"
      type="textarea"
      commentProp={commentProp}
    />
  );
}
