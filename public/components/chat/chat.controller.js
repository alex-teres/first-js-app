import io from 'socket.io-client';
var socket = io('localhost:8888');
class chatCtrl{
    constructor($scope, Chat,Home,User, Auth) {

        this.Chat = Chat;
        this.Home = Home;
        this.$scope = $scope;

        User.me().then(
            function (res) {
                $scope.user = res;
                Auth.setUser(res);
                if ($scope.user.avatarUrl == undefined) {
                    $scope.user.avatarUrl = 'images/avatar.jpg'
                }
            },
            function (x) {
                $scope.errMessage = "Something wrong";
                console.log(x);
            });

        Chat.all({populate:'owner'}).then(
            (res)=>{
                this.messages = res.data;
            },
            (err)=>{
                console.log(err);
            }
        );

        socket.on('messageOut', (msg)=>{
            this.messages.push(msg);
            $scope.$apply();
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

}
export default chatCtrl;