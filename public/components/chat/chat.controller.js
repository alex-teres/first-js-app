import io from 'socket.io-client';
var socket = io('sasha-blog.test.jsninjas.net:8888');
class chatCtrl{
    constructor($scope, Chat,Home,User, Auth, $timeout, $compile) {
        var chat = $("#listOfMessages")[0];
        this.Chat = Chat;
        this.Home = Home;
        this.$scope = $scope;

        User.me().then(
             (res)=> {
                $scope.user = res;
                Auth.setUser(res);
                if ($scope.user.avatarUrl == undefined) {
                    $scope.user.avatarUrl = 'images/avatar.jpg'
                }
            },
             (x)=> {
                $scope.errMessage = "Something wrong";
                console.log(x);
            });

        Chat.all({populate:'owner'}).then(
            (res)=>{
                this.messages = res.data;
                $timeout(()=>{
                    chat.scrollTop = chat.scrollHeight;
                },500);
            },
            (err)=>{
                console.log(err);
            }
        );

        socket.on('messageOut', (msg)=>{
            this.messages.push(msg);
            $scope.$apply();
                chat.scrollTop = chat.scrollHeight;
         });

    }
    sendMessage(text){
        var nowDate = new Date();
        if(text){
            var message = {
                text:text,
                date:nowDate
            };

            this.Chat.add(message).then(
                ()=>{
                    message.owner = this.$scope.user;
                    socket.emit('messageIn',message);
                    this.$scope.newMessage = "";
                },
                (err)=>{
                    console.log(err);
                }
            );

        } else {
            console.log('Message is empty');
        }
    }
    enter(event, text){
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {
                this.sendMessage(text);
            }
    }

}
export default chatCtrl;